"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { Send, Loader2, Sparkles, User, Copy, Check, Download } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Message } from "@/types";

interface ChatAreaProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  hasApiKey: boolean;
  onOpenSettings: () => void;
}

function CodeBlock({ children, className }: { children: string; className?: string }) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="relative group my-3">
      <div className="flex items-center justify-between bg-[#1a1a2e] border border-border rounded-t-lg px-4 py-1.5 text-xs text-muted-foreground">
        <span>{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1 hover:text-foreground transition-colors"
        >
          {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!mt-0 !rounded-t-none">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

export default function ChatArea({
  messages,
  input,
  onInputChange,
  onSubmit,
  isLoading,
  hasApiKey,
  onOpenSettings,
}: ChatAreaProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height =
        Math.min(textareaRef.current.scrollHeight, 200) + "px";
    }
  }, [input]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      onSubmit(e as unknown as React.FormEvent);
    }
  };

  const handleExport = useCallback(() => {
    const text = messages
      .map((m) => `${m.role === "assistant" ? "Claude" : "You"}:\n${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexusai-chat-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  if (!hasApiKey) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-3 gradient-text">
            Welcome to NexusAI
          </h2>
          <p className="text-muted-foreground mb-6">
            To start chatting with Claude, you need to add your Anthropic API
            key in the settings.
          </p>
          <button
            onClick={onOpenSettings}
            className="px-6 py-3 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl transition-colors font-medium"
          >
            Open Settings
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Header bar */}
      {messages.length > 0 && (
        <div className="flex items-center justify-end px-4 py-2 border-b border-border">
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-card-hover"
          >
            <Download className="w-3.5 h-3.5" />
            Export
          </button>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-lg">
              <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                How can I help you today?
              </h2>
              <p className="text-muted-foreground text-sm">
                Start a conversation with Claude AI. Ask questions, write code,
                analyze data, or explore ideas.
              </p>
              <div className="mt-6 grid grid-cols-2 gap-3">
                {[
                  "Explain quantum computing simply",
                  "Write a Python web scraper",
                  "Help me debug my code",
                  "Create a business plan",
                ].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => onInputChange(suggestion)}
                    className="p-3 text-left text-sm border border-border rounded-xl hover:bg-card-hover hover:border-border-hover transition-colors text-muted-foreground"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto w-full px-4 py-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 animate-in">
                <div
                  className={`w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center ${
                    message.role === "assistant"
                      ? "bg-primary/10 text-primary"
                      : "bg-accent text-foreground"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="w-4 h-4" />
                  ) : (
                    <User className="w-4 h-4" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-muted mb-1 font-medium">
                    {message.role === "assistant" ? "Claude" : "You"}
                  </div>
                  <div className="prose text-sm leading-relaxed text-foreground">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        pre: ({ children }) => <>{children}</>,
                        code: ({ children, className, ...props }) => {
                          const isBlock = className?.startsWith("hljs") || className?.startsWith("language-");
                          if (isBlock) {
                            return (
                              <CodeBlock className={className}>
                                {String(children).replace(/\n$/, "")}
                              </CodeBlock>
                            );
                          }
                          return (
                            <code className="bg-accent px-1 py-0.5 rounded text-[0.85em]" {...props}>
                              {children}
                            </code>
                          );
                        },
                      }}
                    >
                      {message.content}
                    </ReactMarkdown>
                  </div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-lg flex-shrink-0 flex items-center justify-center bg-primary/10 text-primary">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div className="flex items-center gap-1 py-3">
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                  <div className="w-2 h-2 rounded-full bg-primary typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t border-border p-4">
        <form
          onSubmit={onSubmit}
          className="max-w-4xl mx-auto flex items-end gap-3"
        >
          <div className="flex-1 relative">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Shift+Enter for new line)"
              className="w-full resize-none bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all"
              rows={1}
              disabled={isLoading}
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="p-3 bg-primary hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed text-primary-foreground rounded-xl transition-colors flex-shrink-0"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Send className="w-5 h-5" />
            )}
          </button>
        </form>
        <p className="text-center text-xs text-muted mt-2 max-w-4xl mx-auto">
          Claude can make mistakes. Verify important information.
        </p>
      </div>
    </div>
  );
}
