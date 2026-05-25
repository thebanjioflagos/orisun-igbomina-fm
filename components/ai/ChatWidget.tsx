"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect, useMemo } from "react";
import { MessageCircle, X, Send, Sparkles, User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const chat = useChat({ api: "/api/chatbot" } as any) as any;
  const { input, handleInputChange, handleSubmit, isLoading, setInput } = chat;
  const rawMessages = chat.messages;
  const typedMessages: Array<{ id: string; role: string; content: string }> = useMemo(() => rawMessages || [], [rawMessages]);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [typedMessages]);

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {/* Chat Window */}
      {isOpen && (
        <div className="w-[350px] sm:w-[400px] h-[500px] bg-orisun-deep border border-orisun-gold/30 rounded-lg shadow-2xl flex flex-col overflow-hidden mb-4 animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="p-4 bg-orisun-gold flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orisun-deep rounded-full flex items-center justify-center">
                <Sparkles className="text-orisun-gold" size={16} />
              </div>
              <div>
                <h3 className="font-fraunces text-orisun-deep font-bold text-sm">Ask Orisun</h3>
                <p className="text-[8px] font-unbounded text-orisun-deep/60 uppercase tracking-widest">Cultural Guide</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-orisun-deep/60 hover:text-orisun-deep">
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-orisun-gold/20"
          >
            {typedMessages.length === 0 && (
              <div className="text-center py-8 space-y-4">
                <p className="text-orisun-ivory/40 text-xs font-dm-sans">
                  &quot;E kaasan! I am Orisun. How can I help you explore Igbomina culture today?&quot;
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {["Tell me about Ila-Orangun", "What's on air?", "Who are the Igbomina?"].map((q) => (
                    <button
                      key={q}
                      onClick={() => setInput(q)}
                      className="px-3 py-1 bg-orisun-gold/5 border border-orisun-gold/20 rounded-full text-[10px] text-orisun-gold hover:bg-orisun-gold/10"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {typedMessages.map((m) => (
              <div
                key={m.id}
                className={cn(
                  "flex gap-3",
                  m.role === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border",
                  m.role === "user" ? "border-orisun-ivory/20 bg-orisun-ivory/5" : "border-orisun-gold/20 bg-orisun-gold/5"
                )}>
                  {m.role === "user" ? <User size={14} /> : <Bot size={14} className="text-orisun-gold" />}
                </div>
                <div className={cn(
                  "max-w-[80%] p-3 rounded-sm text-sm font-dm-sans leading-relaxed",
                  m.role === "user" 
                    ? "bg-orisun-gold/10 text-orisun-ivory border border-orisun-gold/20" 
                    : "bg-orisun-deep text-orisun-ivory/80 border border-orisun-gold/10"
                )}>
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3 animate-pulse">
                <div className="w-8 h-8 rounded-full bg-orisun-gold/10 border border-orisun-gold/20 flex items-center justify-center">
                  <Bot size={14} className="text-orisun-gold" />
                </div>
                <div className="h-10 w-24 bg-orisun-gold/5 border border-orisun-gold/10 rounded-sm" />
              </div>
            )}
          </div>

          {/* Input */}
          <form onSubmit={handleSubmit} className="p-4 border-t border-orisun-gold/10 bg-orisun-gold/5">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Ask something..."
                className="flex-1 bg-transparent border-none outline-none text-orisun-ivory text-sm placeholder:text-orisun-ivory/20"
              />
              <button 
                type="submit"
                disabled={!input || isLoading}
                className="text-orisun-gold disabled:text-orisun-gold/20"
              >
                <Send size={20} />
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 bg-orisun-gold rounded-full flex items-center justify-center shadow-2xl transition-transform hover:scale-110 active:scale-95 group"
      >
        {isOpen ? (
          <X className="text-orisun-deep" size={28} />
        ) : (
          <div className="relative">
            <MessageCircle className="text-orisun-deep" size={28} />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-orisun-crimson rounded-full border-2 border-orisun-gold animate-ping" />
          </div>
        )}
      </button>
    </div>
  );
}
