import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User, Trash2, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useChatbot } from "@/hooks/useChatbot";

// Emoji categories
const emojiData = {
  "Smileys": ["😀", "😃", "😄", "😁", "😅", "😂", "🤣", "😊", "😇", "🙂", "😉", "😍", "🥰", "😘", "😋", "😎", "🤩", "🥳", "😏", "🤔", "🤗", "🤭", "😐", "😑", "😶", "🙄", "😬", "😮", "🤯", "😱"],
  "Gestures": ["👋", "🤚", "✋", "🖐️", "👌", "🤌", "✌️", "🤞", "🤟", "🤘", "👍", "👎", "👏", "🙌", "🤝", "🙏", "💪", "🎉", "🔥", "⭐", "💯", "✨", "❤️", "🧡", "💛", "💚", "💙", "💜", "🖤", "💝"],
  "Objects": ["💻", "📱", "💡", "📚", "🎯", "🚀", "⚡", "🔧", "⚙️", "📊", "📈", "🎓", "🏆", "🎨", "🎮", "📧", "💼", "📁", "🔗", "💾", "🖥️", "⌨️", "🖱️", "📝", "✏️", "📌", "📍", "🔍", "💎", "🌟"]
};

// Simple markdown parser for chat messages
const parseMarkdown = (text: string) => {
  if (!text) return null;
  
  const parts: (string | JSX.Element)[] = [];
  let lastIndex = 0;
  let keyIndex = 0;
  
  const regex = /(\*\*(.+?)\*\*|\*(.+?)\*|`(.+?)`)/g;
  let match;
  
  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    
    if (match[2]) {
      parts.push(<strong key={keyIndex++} className="font-bold">{match[2]}</strong>);
    } else if (match[3]) {
      parts.push(<em key={keyIndex++} className="italic">{match[3]}</em>);
    } else if (match[4]) {
      parts.push(<code key={keyIndex++} className="bg-portfolio-accent/20 px-1 rounded text-xs">{match[4]}</code>);
    }
    
    lastIndex = match.index + match[0].length;
  }
  
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  
  return parts.length > 0 ? parts : text;
};

// Emoji Picker Component
const EmojiPicker = ({ onSelect, onClose }: { onSelect: (emoji: string) => void; onClose: () => void }) => {
  const [activeCategory, setActiveCategory] = useState<keyof typeof emojiData>("Smileys");
  const pickerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <motion.div
      ref={pickerRef}
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      className="absolute bottom-full right-0 mb-2 w-72 bg-portfolio-bg border border-portfolio-accent/30 rounded-xl shadow-2xl overflow-hidden"
    >
      {/* Category tabs */}
      <div className="flex border-b border-portfolio-accent/20 p-1 gap-1">
        {Object.keys(emojiData).map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category as keyof typeof emojiData)}
            className={`flex-1 px-2 py-1.5 text-xs rounded-lg transition-colors ${
              activeCategory === category
                ? "bg-portfolio-accent text-white"
                : "text-portfolio-text/70 hover:bg-portfolio-accent/10"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      
      {/* Emoji grid */}
      <div className="p-2 h-40 overflow-y-auto">
        <div className="grid grid-cols-8 gap-1">
          {emojiData[activeCategory].map((emoji, index) => (
            <button
              key={index}
              onClick={() => {
                onSelect(emoji);
                onClose();
              }}
              className="w-8 h-8 flex items-center justify-center text-lg hover:bg-portfolio-accent/20 rounded-lg transition-colors"
            >
              {emoji}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

// Sound effects using Web Audio API
const useAudioFeedback = () => {
  const audioContextRef = useRef<AudioContext | null>(null);

  const getAudioContext = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioContextRef.current;
  }, []);

  const playSound = useCallback((frequency: number, duration: number, type: OscillatorType = 'sine') => {
    try {
      const ctx = getAudioContext();
      const oscillator = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      oscillator.frequency.value = frequency;
      oscillator.type = type;
      
      gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
      
      oscillator.start(ctx.currentTime);
      oscillator.stop(ctx.currentTime + duration);
    } catch (e) {
      console.log('Audio not supported');
    }
  }, [getAudioContext]);

  const playSendSound = useCallback(() => {
    playSound(800, 0.1, 'sine');
    setTimeout(() => playSound(1000, 0.1, 'sine'), 50);
  }, [playSound]);

  const playReceiveSound = useCallback(() => {
    playSound(600, 0.15, 'sine');
    setTimeout(() => playSound(800, 0.1, 'sine'), 100);
  }, [playSound]);

  const playTypingSound = useCallback(() => {
    playSound(400, 0.05, 'square');
  }, [playSound]);

  return { playSendSound, playReceiveSound, playTypingSound };
};

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

// Welcome message component
const WelcomeMessage = () => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="flex gap-3"
  >
    <div className="w-8 h-8 rounded-full bg-portfolio-accent/20 flex items-center justify-center flex-shrink-0">
      <Bot className="w-4 h-4 text-portfolio-accent" />
    </div>
    <div className="max-w-[85%] p-3 rounded-2xl rounded-bl-md bg-portfolio-card text-portfolio-text text-sm">
      <p>👋 <strong className="font-bold">Hey there!</strong> I'm Nihal's AI assistant.</p>
      <p className="mt-2">I can tell you about his <strong className="font-bold">skills</strong>, <strong className="font-bold">projects</strong>, <strong className="font-bold">hackathon experiences</strong>, or help you get in touch!</p>
      <p className="mt-2 text-portfolio-text/70">What would you like to know?</p>
    </div>
  </motion.div>
);

export const AIChatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showWelcome, setShowWelcome] = useState(true);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const { messages, isLoading, error, sendMessage, clearMessages } = useChatbot();
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const prevMessagesLength = useRef(messages.length);
  const { playSendSound, playReceiveSound, playTypingSound } = useAudioFeedback();

  // Hide welcome message when user sends first message
  useEffect(() => {
    if (messages.length > 0) {
      setShowWelcome(false);
    }
  }, [messages]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  // Play sound when new message arrives
  useEffect(() => {
    if (messages.length > prevMessagesLength.current) {
      const lastMessage = messages[messages.length - 1];
      if (lastMessage?.role === 'assistant' && lastMessage.content) {
        playReceiveSound();
      }
    }
    prevMessagesLength.current = messages.length;
  }, [messages, playReceiveSound]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const handleClearMessages = () => {
    clearMessages();
    setShowWelcome(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (e.target.value.length > inputValue.length) {
      playTypingSound();
    }
  };

  const handleEmojiSelect = (emoji: string) => {
    setInputValue(prev => prev + emoji);
    inputRef.current?.focus();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim() && !isLoading) {
      playSendSound();
      sendMessage(inputValue);
      setInputValue("");
      setShowEmojiPicker(false);
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
                  onClick={handleClearMessages}
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
              <div className="space-y-4">
                {/* Welcome message */}
                {showWelcome && messages.length === 0 && <WelcomeMessage />}
                
                {/* Quick suggestions when no messages */}
                {messages.length === 0 && (
                  <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="mt-4 flex flex-wrap gap-2 justify-center"
                  >
                    {["What are Nihal's skills?", "Tell me about projects", "How to contact Nihal?"].map((suggestion) => (
                      <button
                        key={suggestion}
                        onClick={() => {
                          playSendSound();
                          setInputValue(suggestion);
                          sendMessage(suggestion);
                        }}
                        className="px-3 py-1.5 text-xs bg-portfolio-accent/10 text-portfolio-accent rounded-full hover:bg-portfolio-accent/20 transition-colors"
                      >
                        {suggestion}
                      </button>
                    ))}
                  </motion.div>
                )}

                {/* Chat messages */}
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
                      {message.content ? (
                        message.role === "assistant" ? parseMarkdown(message.content) : message.content
                      ) : (
                        <TypingIndicator />
                      )}
                    </div>
                  </motion.div>
                ))}
                
                {/* Loading indicator */}
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
              
              {error && (
                <div className="mt-3 p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-red-400 text-xs">
                  {error}
                </div>
              )}
            </ScrollArea>

            {/* Input */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-portfolio-accent/20">
              <div className="flex gap-2 relative">
                {/* Emoji Picker */}
                <AnimatePresence>
                  {showEmojiPicker && (
                    <EmojiPicker
                      onSelect={handleEmojiSelect}
                      onClose={() => setShowEmojiPicker(false)}
                    />
                  )}
                </AnimatePresence>
                
                <Button
                  type="button"
                  size="icon"
                  variant="ghost"
                  onClick={() => setShowEmojiPicker(!showEmojiPicker)}
                  className="text-portfolio-text/60 hover:text-portfolio-accent hover:bg-portfolio-accent/10"
                >
                  <Smile className="w-5 h-5" />
                </Button>
                
                <input
                  ref={inputRef}
                  value={inputValue}
                  onChange={handleInputChange}
                  placeholder="Type a message..."
                  className="flex-1 px-4 py-2 bg-white dark:bg-gray-800 border border-portfolio-accent/30 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-portfolio-accent/50 disabled:opacity-50"
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
