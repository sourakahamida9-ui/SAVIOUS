"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { Terminal, X, ChevronRight } from "lucide-react";

interface TerminalLine {
  id: number;
  type: "input" | "output" | "error" | "system";
  text: string;
  timestamp: string;
}

interface TerminalPanelProps {
  onClose?: () => void;
  agentSteps?: { text: string; status: string }[];
}

export default function TerminalPanel({ onClose, agentSteps }: TerminalPanelProps) {
  const [lines, setLines] = useState<TerminalLine[]>([
    {
      id: 0,
      type: "system",
      text: "NexusAI Terminal v2.0 — Agent workspace ready",
      timestamp: new Date().toISOString(),
    },
    {
      id: 1,
      type: "system",
      text: "Type commands or watch agent activity in real-time",
      timestamp: new Date().toISOString(),
    },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const lineIdRef = useRef(2);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [lines]);

  useEffect(() => {
    if (agentSteps && agentSteps.length > 0) {
      const latestStep = agentSteps[agentSteps.length - 1];
      const statusIcon =
        latestStep.status === "done" ? "[done]" :
        latestStep.status === "running" ? "[...]" :
        latestStep.status === "error" ? "[ERR]" : "[...]";
      addLine("output", `${statusIcon} ${latestStep.text}`);
    }
  }, [agentSteps?.length]);

  const addLine = useCallback((type: TerminalLine["type"], text: string) => {
    setLines((prev) => [
      ...prev,
      {
        id: lineIdRef.current++,
        type,
        text,
        timestamp: new Date().toISOString(),
      },
    ]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    addLine("input", input);
    setHistory((prev) => [...prev, input]);
    setHistoryIndex(-1);

    const cmd = input.trim().toLowerCase();
    if (cmd === "clear") {
      setLines([]);
    } else if (cmd === "help") {
      addLine("output", "Available commands:");
      addLine("output", "  clear    — Clear terminal");
      addLine("output", "  help     — Show this help");
      addLine("output", "  version  — Show version info");
      addLine("output", "  status   — Show agent status");
      addLine("output", "  providers — List AI providers");
    } else if (cmd === "version") {
      addLine("output", "NexusAI v2.0.0 — Next.js 16 + Vercel AI SDK");
    } else if (cmd === "status") {
      addLine("output", "Agent: idle");
      addLine("output", "Models: ready");
      addLine("output", "Memory: localStorage active");
    } else if (cmd === "providers") {
      addLine("output", "Claude | OpenAI | Gemini | Groq | DeepSeek | OpenRouter | Ollama | LM Studio");
    } else {
      addLine("output", `nexus: command not found: ${input}`);
      addLine("system", "This is a simulated terminal. Full sandbox coming in v3.0");
    }

    setInput("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length > 0) {
        const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input": return "text-emerald-400";
      case "output": return "text-foreground";
      case "error": return "text-red-400";
      case "system": return "text-violet-400/70";
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#0d0d11] border-t border-border">
      {/* Header */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <Terminal className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-xs font-medium text-foreground">Terminal</span>
          <span className="text-[10px] text-muted-foreground">bash</span>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-0.5 rounded hover:bg-card-hover transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Output */}
      <div
        className="flex-1 overflow-y-auto p-3 font-mono text-[12px] leading-5 cursor-text"
        onClick={() => inputRef.current?.focus()}
      >
        {lines.map((line) => (
          <div key={line.id} className={`${lineColor(line.type)} flex`}>
            {line.type === "input" && (
              <span className="text-violet-400 mr-2 select-none">
                <ChevronRight className="w-3 h-3 inline-block" /> ~$
              </span>
            )}
            <span className="whitespace-pre-wrap break-all">{line.text}</span>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="flex items-center px-3 py-2 border-t border-border/50">
        <span className="text-violet-400 mr-2 text-xs font-mono select-none">
          <ChevronRight className="w-3 h-3 inline-block" /> ~$
        </span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent text-xs font-mono text-emerald-400 focus:outline-none placeholder:text-muted"
          placeholder="type a command..."
          autoFocus
        />
      </form>
    </div>
  );
}
