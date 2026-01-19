import { useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export const useChatbot = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(async (userMessage: string) => {
    if (!userMessage.trim()) return;

    const newUserMessage: Message = { role: "user", content: userMessage };
    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await supabase.functions.invoke("chat", {
        body: {
          messages: [...messages, newUserMessage].map((m) => ({
            role: m.role,
            content: m.content,
          })),
        },
      });

      if (response.error) {
        throw new Error(response.error.message || "Failed to get response");
      }

      // Handle streaming response
      const reader = response.data.getReader?.();
      
      if (reader) {
        const decoder = new TextDecoder();
        let assistantMessage = "";

        // Add empty assistant message that we'll update
        setMessages((prev) => [...prev, { role: "assistant", content: "" }]);

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value);
          const lines = chunk.split("\n");

          for (const line of lines) {
            if (line.startsWith("data: ")) {
              const data = line.slice(6);
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const content = parsed.choices?.[0]?.delta?.content || "";
                assistantMessage += content;

                // Update the last message with new content
                setMessages((prev) => {
                  const updated = [...prev];
                  updated[updated.length - 1] = {
                    role: "assistant",
                    content: assistantMessage,
                  };
                  return updated;
                });
              } catch {
                // Skip invalid JSON
              }
            }
          }
        }
      } else {
        // Non-streaming fallback
        const data = response.data;
        if (typeof data === "string") {
          setMessages((prev) => [...prev, { role: "assistant", content: data }]);
        } else if (data?.choices?.[0]?.message?.content) {
          setMessages((prev) => [
            ...prev,
            { role: "assistant", content: data.choices[0].message.content },
          ]);
        }
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      setError(err instanceof Error ? err.message : "Something went wrong");
      // Remove the user message if we couldn't get a response
      setMessages((prev) => prev.slice(0, -1));
    } finally {
      setIsLoading(false);
    }
  }, [messages]);

  const clearMessages = useCallback(() => {
    setMessages([]);
    setError(null);
  }, []);

  return {
    messages,
    isLoading,
    error,
    sendMessage,
    clearMessages,
  };
};
