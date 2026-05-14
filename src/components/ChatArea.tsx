"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  Send,
  Loader2,
  Sparkles,
  User,
  Copy,
  Check,
  Download,
  ArrowUp,
  Brain,
  Server,
  Blocks,
  ChevronDown,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import type { Message, Provider } from "@/types";

interface ChatAreaProps {
  messages: Message[];
  input: string;
  onInputChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
  hasApiKey: boolean;
  onOpenSettings: () => void;
  provider: Provider;
  model: string;
}

function CodeBlock({
  children,
  className,
}: {
  children: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);
  const language = className?.replace(/language-/, "") || "";

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [children]);

  return (
    <div className="relative group my-3 rounded-xl overflow-hidden border border-border">
      <div className="flex items-center justify-between bg-surface px-4 py-2 text-xs text-muted-foreground">
        <span className="font-mono">{language || "code"}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 hover:text-foreground transition-colors"
        >
          {copied ? (
            <Check className="w-3 h-3 text-success" />
          ) : (
            <Copy className="w-3 h-3" />
          )}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="!mt-0 !rounded-none !border-0">
        <code className={className}>{children}</code>
      </pre>
    </div>
  );
}

const SUGGESTIONS = [
  { text: "Build a REST API with authentication", icon: "code" },
  { text: "Explain how transformers work", icon: "brain" },
  { text: "Write a Python data pipeline", icon: "data" },
  { text: "Debug my React component", icon: "bug" },
];

const PROVIDER_LABELS: Record<Provider, string> = {
  claude: "Claude",
  ollama: "Ollama",
  "openai-compatible": "Custom",
};

export default function ChatArea({
  messages,
  input,
  onInputChange,
  onSubmit,
  isLoading,
  hasApiKey,
  onOpenSettings,
  provider,
  model,
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
      .map((m) => `${m.role === "assistant" ? "AI" : "You"}:\n${m.content}`)
      .join("\n\n---\n\n");
    const blob = new Blob([text], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `nexusai-chat-${new Date().toISOString().slice(0, 10)}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [messages]);

  const modelDisplayName = model
    .replace("claude-sonnet-4-20250514", "Sonnet 4")
    .replace("claude-opus-4-20250514", "Opus 4")
    .replace("claude-3-5-haiku-20241022", "Haiku 3.5")
    .replace(model, model.split("/").pop() || model);

  // No API key / not configured state
  if (!hasApiKey && provider === "claude") {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-center max-w-md">
          <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/10 flex items-center justify-center">
            <Sparkles className="w-8 h-8 text-violet-400" />
          </div>
          <h2 className="text-2xl font-bold mb-3">Welcome to NexusAI</h2>
          <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
            Configure your AI provider to start chatting. Choose between Claude,
            Ollama (local), or any OpenAI-compatible endpoint.
          </p>
          <button
            onClick={onOpenSettings}
            className="px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl transition-all font-medium text-sm shadow-lg shadow-violet-500/20"
          >
            Configure Provider
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col min-h-0">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-surface/30 h-[44px]">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-0.5 rounded-md text-[10px] font-semibold ${
            provider === "claude" ? "bg-amber-500/10 text-amber-400" :
            provider === "ollama" ? "bg-emerald-500/10 text-emerald-400" :
            "bg-blue-500/10 text-blue-400"
          }`}>
            {PROVIDER_LABELS[provider]}
          </span>
          <span className="text-xs text-muted-foreground">{modelDisplayName}</span>
        </div>
        {messages.length > 0 && (
          <button
            onClick={handleExport}
            className="flex items-center gap-1.5 text-[11px] text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-lg hover:bg-card-hover"
          >
            <Download className="w-3 h-3" />
            Export
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center max-w-2xl">
              <div className="w-14 h-14 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/10 flex items-center justify-center">
                <Sparkles className="w-7 h-7 text-violet-400" />
              </div>
              <h2 className="text-xl font-semibold mb-2">
                What can I help you with?
              </h2>
              <p className="text-muted-foreground text-sm mb-8">
                Start a conversation or try one of these suggestions
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-lg mx-auto">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s.text}
                    onClick={() => onInputChange(s.text)}
                    className="p-3.5 text-left text-sm border border-border rounded-xl hover:bg-card-hover hover:border-border-hover transition-all text-muted-foreground hover:text-foreground group"
                  >
                    <span className="group-hover:text-foreground transition-colors">{s.text}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto w-full px-4 py-6 space-y-6">
            {messages.map((message) => (
              <div key={message.id} className="flex gap-3 animate-in">
                <div
                  className={`w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center mt-0.5 ${
                    message.role === "assistant"
                      ? "bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/10"
                      : "bg-card border border-border"
                  }`}
                >
                  {message.role === "assistant" ? (
                    <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  ) : (
                    <User className="w-3.5 h-3.5 text-muted-foreground" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] text-muted mb-1.5 font-medium uppercase tracking-wider">
                    {message.role === "assistant" ? PROVIDER_LABELS[provider] : "You"}
                  </div>
                  <div className="prose text-sm leading-relaxed text-foreground">
                    <ReactMarkdown
                      remarkPlugins={[remarkGfm]}
                      rehypePlugins={[rehypeHighlight]}
                      components={{
                        pre: ({ children }) => <>{children}</>,
                        code: ({ children, className, ...props }) => {
                          const isBlock =
                            className?.startsWith("hljs") ||
                            className?.startsWith("language-");
                          if (isBlock) {
                            return (
                              <CodeBlock className={className}>
                                {String(children).replace(/\n$/, "")}
                              </CodeBlock>
                            );
                          }
                          return (
                            <code
                              className="bg-accent px-1.5 py-0.5 rounded text-[0.85em] text-purple-300"
                              {...props}
                            >
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
                <div className="w-7 h-7 rounded-lg flex-shrink-0 flex items-center justify-center bg-gradient-to-br from-violet-500/20 to-purple-500/20 border border-violet-500/10">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                </div>
                <div className="flex items-center gap-1.5 py-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 typing-dot" />
                  <div className="w-1.5 h-1.5 rounded-full bg-violet-400 typing-dot" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4">
        <form
          onSubmit={onSubmit}
          className="max-w-3xl mx-auto"
        >
          <div className="relative bg-card border border-border rounded-2xl overflow-hidden input-glow transition-all focus-within:border-transparent">
            <textarea
              ref={textareaRef}
              value={input}
              onChange={(e) => onInputChange(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ask anything..."
              className="w-full resize-none bg-transparent px-4 pt-3.5 pb-12 text-sm text-foreground placeholder:text-muted focus:outline-none"
              rows={1}
              disabled={isLoading}
            />
            <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between">
              <span className="text-[10px] text-muted pl-2">
                Shift+Enter for new line
              </span>
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white flex items-center justify-center transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                ) : (
                  <ArrowUp className="w-3.5 h-3.5" />
                )}
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
