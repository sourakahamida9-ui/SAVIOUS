"use client";

import {
  Sparkles,
  MessageSquare,
  Globe,
  Key,
  Code2,
  Zap,
  ArrowRight,
  Bot,
  Shield,
  History,
  Terminal,
  Layers,
  ChevronRight,
  Server,
  Cpu,
  Brain,
  Blocks,
  GitBranch,
  Download,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Brain,
    title: "Multi-Provider AI",
    desc: "Connect Claude, Ollama, or any OpenAI-compatible API. Switch models instantly — from cloud to local inference.",
    gradient: "from-violet-500/20 to-purple-500/20",
    iconColor: "text-violet-400",
    border: "border-violet-500/10",
  },
  {
    icon: Globe,
    title: "Embedded Browser",
    desc: "Research the web inline. Navigate docs, test endpoints, and reference resources — all without leaving the workspace.",
    gradient: "from-cyan-500/20 to-blue-500/20",
    iconColor: "text-cyan-400",
    border: "border-cyan-500/10",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "BYOK architecture. Your API keys live in your browser. Nothing is stored server-side. Full control, zero trust.",
    gradient: "from-emerald-500/20 to-teal-500/20",
    iconColor: "text-emerald-400",
    border: "border-emerald-500/10",
  },
  {
    icon: Code2,
    title: "Code Intelligence",
    desc: "Syntax highlighting for 100+ languages with one-click copy. Rendered Markdown, LaTeX math, tables, and diagrams.",
    gradient: "from-amber-500/20 to-orange-500/20",
    iconColor: "text-amber-400",
    border: "border-amber-500/10",
  },
  {
    icon: History,
    title: "Persistent Memory",
    desc: "Every conversation is auto-saved locally. Resume where you left off, search history, and export as Markdown.",
    gradient: "from-rose-500/20 to-pink-500/20",
    iconColor: "text-rose-400",
    border: "border-rose-500/10",
  },
  {
    icon: Zap,
    title: "Streaming Responses",
    desc: "Built on Next.js 16 with Turbopack. Token-by-token streaming renders in real-time as the model generates.",
    gradient: "from-yellow-500/20 to-amber-500/20",
    iconColor: "text-yellow-400",
    border: "border-yellow-500/10",
  },
];

const PROVIDERS = [
  {
    name: "Claude",
    models: ["Sonnet 4", "Opus 4", "Haiku 3.5"],
    color: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    icon: "provider-claude",
  },
  {
    name: "Ollama",
    models: ["Llama 3.3", "Mistral", "Gemma 2", "Phi-4", "Qwen"],
    color: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    icon: "provider-ollama",
  },
  {
    name: "OpenAI-Compatible",
    models: ["Any endpoint", "Custom models", "Local inference"],
    color: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    icon: "",
  },
];

const TECH_STACK = [
  { name: "Next.js 16", desc: "App Router + Turbopack", icon: Blocks },
  { name: "React 19", desc: "Server & Client Components", icon: Layers },
  { name: "TypeScript", desc: "Full type safety", icon: Code2 },
  { name: "Vercel AI SDK", desc: "Streaming responses", icon: Zap },
  { name: "Ollama", desc: "Local model inference", icon: Server },
  { name: "Tailwind v4", desc: "Utility-first CSS", icon: Terminal },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background hero-gradient">
      {/* Grid pattern */}
      <div className="fixed inset-0 grid-pattern pointer-events-none" />

      {/* Navbar */}
      <nav className="relative z-20 border-b border-border/50 backdrop-blur-xl bg-background/70">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-lg shadow-violet-500/20">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight">NexusAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#providers" className="hover:text-foreground transition-colors">Providers</a>
            <a href="#tech" className="hover:text-foreground transition-colors">Stack</a>
            <a
              href="https://github.com/sourakahamida9-ui/SAVIOUS"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-foreground transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" />
              GitHub
            </a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/chat"
              className="group px-5 py-2.5 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl text-sm font-medium transition-all hover:shadow-lg hover:shadow-violet-500/25 flex items-center gap-2"
            >
              Open App
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-20 md:pt-32 pb-20 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-surface/50 backdrop-blur-sm text-sm mb-8 badge-shine">
          <span className="px-2 py-0.5 bg-gradient-to-r from-violet-600 to-purple-600 text-white text-xs font-bold rounded-full">v2.0</span>
          <span className="text-muted-foreground">Now with Ollama & multi-provider support</span>
          <ChevronRight className="w-3.5 h-3.5 text-muted" />
        </div>

        <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.05] tracking-tight mb-8">
          Your AI workspace,{" "}
          <span className="gradient-text">unified</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
          One interface for Claude, Ollama, and any OpenAI-compatible model.
          Chat, browse, code — all with streaming responses, syntax highlighting,
          and persistent history. Privacy-first, open-source.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/chat"
            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl text-sm font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 glow-sm"
          >
            Start chatting
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <a
            href="https://github.com/sourakahamida9-ui/SAVIOUS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-4 border border-border hover:bg-surface rounded-2xl text-sm font-medium transition-all hover:border-border-hover"
          >
            <GitBranch className="w-4 h-4" />
            View on GitHub
          </a>
        </div>

        {/* Floating model badges */}
        <div className="flex flex-wrap items-center justify-center gap-3 mt-12">
          {["Claude Sonnet 4", "Claude Opus 4", "Llama 3.3", "Mistral", "Gemma 2", "Phi-4"].map((model) => (
            <span
              key={model}
              className="px-3 py-1.5 rounded-lg bg-surface border border-border text-xs text-muted-foreground font-medium"
            >
              {model}
            </span>
          ))}
        </div>
      </section>

      {/* Product Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/40 glow-md">
          {/* Window chrome */}
          <div className="bg-surface border-b border-border px-4 py-3 flex items-center">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
              <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
              <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-6 py-1 bg-card rounded-lg text-xs text-muted-foreground font-mono">
                nexusai.app
              </div>
            </div>
            <div className="w-16" />
          </div>
          {/* App content mock */}
          <div className="bg-background p-0.5">
            <div className="flex h-[420px] md:h-[520px]">
              {/* Sidebar mock */}
              <div className="w-60 bg-sidebar border-r border-border flex-shrink-0 hidden md:flex flex-col">
                <div className="p-3 border-b border-border flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-sm font-semibold">NexusAI</span>
                </div>
                <div className="p-2">
                  <div className="px-3 py-2.5 bg-gradient-to-r from-violet-600/20 to-purple-600/20 border border-violet-500/10 text-violet-300 rounded-xl text-xs font-medium flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5" /> New Chat
                  </div>
                </div>
                <div className="p-2 space-y-0.5 flex-1 text-muted-foreground">
                  {[
                    { title: "Build a REST API", time: "2m ago" },
                    { title: "Explain transformers", time: "1h ago" },
                    { title: "Debug React hooks", time: "3h ago" },
                    { title: "Python data pipeline", time: "Yesterday" },
                  ].map((c) => (
                    <div key={c.title} className="px-3 py-2 rounded-lg text-xs flex items-center gap-2 hover:bg-sidebar-hover transition-colors cursor-default">
                      <MessageSquare className="w-3 h-3 flex-shrink-0 opacity-40" />
                      <span className="truncate flex-1">{c.title}</span>
                      <span className="text-[10px] opacity-40">{c.time}</span>
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border space-y-0.5">
                  <div className="px-3 py-2 rounded-lg text-xs text-emerald-400/70 flex items-center gap-2 bg-emerald-500/5">
                    <Server className="w-3 h-3" /> Ollama Connected
                  </div>
                  <div className="px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Browser
                  </div>
                </div>
              </div>
              {/* Chat area mock */}
              <div className="flex-1 flex flex-col">
                {/* Model selector bar */}
                <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-surface/50">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-400 text-[10px] font-semibold">Claude</span>
                  <span className="text-xs text-muted-foreground">Sonnet 4</span>
                  <ChevronRight className="w-3 h-3 text-muted rotate-90" />
                </div>
                {/* Messages */}
                <div className="flex-1 overflow-hidden p-6 space-y-5">
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-card flex items-center justify-center flex-shrink-0 border border-border">
                      <span className="text-[10px] font-bold text-muted-foreground">U</span>
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-tl-md px-4 py-3 text-sm max-w-[80%]">
                      Build me a REST API with Express that handles user authentication
                    </div>
                  </div>
                  <div className="flex gap-3 items-start">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/10 flex items-center justify-center flex-shrink-0 border border-violet-500/20">
                      <Sparkles className="w-3 h-3 text-violet-400" />
                    </div>
                    <div className="flex-1 max-w-[90%]">
                      <p className="text-sm text-muted-foreground mb-3">Here&apos;s a complete Express auth API:</p>
                      <div className="rounded-xl overflow-hidden border border-border">
                        <div className="flex items-center justify-between bg-card px-4 py-2 text-[11px] text-muted-foreground border-b border-border">
                          <span className="font-mono">typescript</span>
                          <span className="text-violet-400 cursor-pointer hover:text-violet-300">Copy</span>
                        </div>
                        <pre className="bg-[#0d1117] p-4 text-[12px] font-mono overflow-x-auto">
                          <code>
                            <span className="text-purple-400">import</span> <span className="text-blue-300">express</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;express&apos;</span>{"\n"}
                            <span className="text-purple-400">import</span> <span className="text-blue-300">jwt</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;jsonwebtoken&apos;</span>{"\n"}
                            <span className="text-purple-400">import</span> <span className="text-blue-300">bcrypt</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;bcryptjs&apos;</span>{"\n\n"}
                            <span className="text-purple-400">const</span> <span className="text-blue-300">app</span> = <span className="text-yellow-300">express</span>(){"\n"}
                            <span className="text-blue-300">app</span>.<span className="text-yellow-300">use</span>(<span className="text-blue-300">express</span>.<span className="text-yellow-300">json</span>())
                          </code>
                        </pre>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Input mock */}
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-2 bg-card border border-border rounded-2xl px-4 py-3">
                    <span className="flex-1 text-sm text-muted">Ask anything...</span>
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-600 to-purple-600 flex items-center justify-center">
                      <ArrowRight className="w-3.5 h-3.5 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Everything you need to <span className="gradient-text">build faster</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            A powerful AI workspace built with modern open-source tools
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`group relative rounded-2xl border ${f.border} bg-gradient-to-br ${f.gradient} p-6 transition-all hover:scale-[1.02] hover:shadow-lg cursor-default`}
            >
              <div className={`w-10 h-10 rounded-xl bg-surface border border-border flex items-center justify-center mb-4 ${f.iconColor}`}>
                <f.icon className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Providers Section */}
      <section id="providers" className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Any model, <span className="gradient-text">one interface</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            From cloud APIs to local inference — switch providers and models instantly
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className={`rounded-2xl border ${p.color} p-6 transition-all hover:scale-[1.02]`}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-10 h-10 rounded-xl ${p.icon} flex items-center justify-center text-white text-sm font-bold`}>
                  {p.name[0]}
                </div>
                <div>
                  <h3 className="font-semibold">{p.name}</h3>
                  <p className="text-xs text-muted-foreground">{p.models.length} models</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {p.models.map((m) => (
                  <span key={m} className="px-2.5 py-1 rounded-lg bg-surface border border-border text-xs text-muted-foreground">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="relative z-10 max-w-6xl mx-auto px-6 pb-32">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Built with modern tech</h2>
          <p className="text-muted-foreground text-lg">Open-source tools you know and love</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {TECH_STACK.map((t) => (
            <div key={t.name} className="rounded-xl border border-border bg-surface/50 p-4 text-center hover:bg-surface transition-colors">
              <t.icon className="w-5 h-5 mx-auto mb-2 text-muted-foreground" />
              <div className="text-sm font-semibold mb-0.5">{t.name}</div>
              <div className="text-[11px] text-muted-foreground">{t.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32 text-center">
        <div className="rounded-2xl border border-border bg-gradient-to-b from-violet-500/5 to-transparent p-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to build?</h2>
          <p className="text-muted-foreground mb-8 max-w-md mx-auto">
            Open-source, privacy-first, and completely free.
            Bring your own keys and start chatting.
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-2xl text-sm font-semibold transition-all hover:shadow-xl hover:shadow-violet-500/25 glow-sm"
          >
            Launch NexusAI
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <p className="text-xs text-muted mt-4">Free forever · No account required · Your data stays local</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-8 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">NexusAI — Open-Source AI Platform</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a
              href="https://github.com/sourakahamida9-ui/SAVIOUS"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://docs.anthropic.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Claude Docs
            </a>
            <a
              href="https://ollama.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Ollama
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
