import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatbot } from "@/hooks/useChatbot";

// Typing indicator component with animated dots
const TypingIndicator = () => (
  <div className="flex items-center gap-1">
    <motion.span
      className="w-2 h-2 bg-portfolio-accent rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
    />
    <motion.span
      className="w-2 h-2 bg-portfolio-accent rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.15 }}
    />
    <motion.span
      className="w-2 h-2 bg-portfolio-accent rounded-full"
      animate={{ y: [0, -4, 0] }}
      transition={{ duration: 0.6, repeat: Infinity, delay: 0.3 }}
    />
  </div>
);

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  return (
    <div className="fixed bottom-32 right-6 z-[60]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-16 right-0 w-80 sm:w-96 bg-portfolio-bg/95 backdrop-blur-xl border border-portfolio-accent/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-portfolio-accent to-portfolio-purple p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center">
                  <Bot className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">Nihal's AI Assistant</h3>
                  <p className="text-white/70 text-xs">Ask me anything about the portfolio</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={clearMessages}
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/20"
                  title="Clear chat"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/20"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="h-80 p-4" ref={scrollRef}>
              {messages.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center p-4">
                  <Bot className="w-12 h-12 text-portfolio-accent/50 mb-3" />
                  <p className="text-portfolio-text/70 text-sm">
                    Hi! I'm Nihal's AI assistant. Ask me about his skills, projects, or experience!
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2 justify-center">
                    {["What skills does Nihal have?", "Tell me about projects", "How to contact?"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          setInputValue(suggestion);
                          sendMessage(suggestion);
                        }}
                        className="px-3 py-1.5 text-xs bg-portfolio-accent/10 text-portfolio-accent rounded-full hover:bg-portfolio-accent/20 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((message, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                          message.role === "user"
                            ? "bg-portfolio-purple/20"
                            : "bg-portfolio-accent/20"
                        }`}
                      >
                        {message.role === "user" ? (
                          <User className="w-4 h-4 text-portfolio-purple" />
                        ) : (
                          <Bot className="w-4 h-4 text-portfolio-accent" />
                        )}
                      </div>
                      <div
                        className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                          message.role === "user"
                            ? "bg-portfolio-purple/20 text-portfolio-text rounded-br-md"
                            : "bg-portfolio-card text-portfolio-text rounded-bl-md"
                        }`}
                      >
                        {message.content || <TypingIndicator />}
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && messages[messages.length - 1]?.role === "user" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3"
                    >
                      <div className="w-8 h-8 rounded-full bg-portfolio-accent/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-portfolio-accent" />
                      </div>
                      <div className="bg-portfolio-card p-3 rounded-2xl rounded-bl-md">
                        <TypingIndicator />
                      </div>
                    </motion.div>
                  )}
                </div>
              )}
              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                  {error}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-portfolio-accent/20">
              <div className="flex gap-2">
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-portfolio-card border border-portfolio-accent/20 rounded-lg text-portfolio-text placeholder:text-portfolio-text/40 focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50 disabled:opacity-50"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  size="icon"
                  disabled={!inputValue.trim() || isLoading}
                  className="bg-portfolio-accent hover:bg-portfolio-accent/80 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-colors ${
          isOpen
            ? "bg-portfolio-accent text-white"
            : "bg-gradient-to-r from-portfolio-accent to-portfolio-purple text-white"
        }`}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
            >
              <MessageCircle className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};
