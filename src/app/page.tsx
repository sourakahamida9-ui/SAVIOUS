"use client";

import { useState, useEffect } from "react";
import {
  Sparkles,
  MessageSquare,
  Globe,
  Key,
  Code2,
  Zap,
  ArrowRight,
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
  MousePointer2,
  Play,
  Check,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: Brain,
    title: "Multi-Provider AI",
    desc: "Claude, OpenAI, Gemini, Groq, DeepSeek, OpenRouter, Ollama, LM Studio. Switch instantly.",
    color: "violet",
  },
  {
    icon: Globe,
    title: "Embedded Browser",
    desc: "Research inline. Navigate docs, test endpoints — without leaving the workspace.",
    color: "cyan",
  },
  {
    icon: Shield,
    title: "Privacy First",
    desc: "BYOK — your keys stay in your browser. Nothing stored server-side. Zero trust.",
    color: "emerald",
  },
  {
    icon: Code2,
    title: "Monaco Editor",
    desc: "Full VSCode editor with 17+ languages, syntax highlighting, copy and save.",
    color: "amber",
  },
  {
    icon: Terminal,
    title: "Integrated Terminal",
    desc: "Built-in terminal with command history and real-time agent activity view.",
    color: "rose",
  },
  {
    icon: Zap,
    title: "Real-time Streaming",
    desc: "Token-by-token streaming. Built on Vercel AI SDK with Turbopack.",
    color: "yellow",
  },
];

const PROVIDERS = [
  { name: "Claude", by: "Anthropic", models: ["Sonnet 4", "Opus 4", "Haiku 3.5"], accent: "#d97706" },
  { name: "OpenAI", by: "OpenAI", models: ["GPT-4o", "GPT-4o Mini", "o1"], accent: "#22c55e" },
  { name: "Gemini", by: "Google", models: ["2.0 Flash", "2.5 Pro"], accent: "#3b82f6" },
  { name: "Groq", by: "Groq", models: ["Llama 3.3 70B", "Mixtral"], accent: "#f97316" },
  { name: "DeepSeek", by: "DeepSeek", models: ["Chat", "R1 Reasoner"], accent: "#06b6d4" },
  { name: "OpenRouter", by: "OpenRouter", models: ["100+ models"], accent: "#a855f7" },
  { name: "Ollama", by: "Local", models: ["Llama 3.2", "Mistral", "Gemma 2"], accent: "#10b981" },
  { name: "LM Studio", by: "Local", models: ["Any GGUF model"], accent: "#ec4899" },
];

const AGENT_STEPS = [
  { text: "Analyzing your request...", delay: 0 },
  { text: "Opening project repository...", delay: 1 },
  { text: "Reading package.json...", delay: 2 },
  { text: "Identifying dependencies...", delay: 3 },
  { text: "Writing authentication middleware...", delay: 4 },
  { text: "Running tests... 12/12 passed", delay: 5 },
  { text: "Creating pull request...", delay: 6 },
  { text: "Done. PR #42 ready for review.", delay: 7 },
];

export default function HomePage() {
  const [activeStep, setActiveStep] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % AGENT_STEPS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#09090b] text-white overflow-hidden">
      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-violet-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-purple-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 border-b border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="text-[15px] font-semibold tracking-tight">NexusAI</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[13px] text-zinc-500">
            <a href="#features" className="hover:text-white transition-colors duration-200">Features</a>
            <a href="#providers" className="hover:text-white transition-colors duration-200">Providers</a>
            <a href="https://github.com/sourakahamida9-ui/SAVIOUS" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors duration-200 flex items-center gap-1.5">
              <GitBranch className="w-3 h-3" />
              GitHub
            </a>
          </div>
          <Link
            href="/chat"
            className="px-4 py-1.5 bg-white text-black rounded-lg text-[13px] font-medium hover:bg-zinc-200 transition-colors"
          >
            Open App
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pt-24 md:pt-36 pb-20 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/[0.08] bg-white/[0.03] text-[12px] text-zinc-400 mb-8">
          <span className="px-1.5 py-0.5 bg-violet-600 text-white text-[10px] font-bold rounded-full leading-none">NEW</span>
          <span>9 AI providers · Monaco Editor · Terminal</span>
        </div>

        <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-bold leading-[1.08] tracking-[-0.035em] mb-6">
          The AI workspace<br />
          for <span className="bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent">developers</span>
        </h1>

        <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          One interface for every AI model. Chat, code, browse — with streaming, syntax highlighting, and local model support. Your keys, your data.
        </p>

        <div className="flex items-center justify-center gap-3">
          <Link
            href="/chat"
            className="group flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-100 transition-all"
          >
            Start building
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <a
            href="https://github.com/sourakahamida9-ui/SAVIOUS"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-6 py-3 border border-white/[0.1] hover:border-white/[0.2] rounded-xl text-sm text-zinc-300 hover:text-white transition-all"
          >
            <GitBranch className="w-3.5 h-3.5" />
            View source
          </a>
        </div>
      </section>

      {/* Product Preview — Agent Activity */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="rounded-xl border border-white/[0.08] overflow-hidden bg-[#0c0c10] shadow-2xl shadow-black/60">
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-[#0e0e13]">
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-0.5 rounded-md bg-white/[0.04] text-[11px] text-zinc-500 font-mono">
                nexusai.app
              </div>
            </div>
          </div>

          <div className="flex min-h-[420px] md:min-h-[480px]">
            {/* Sidebar */}
            <div className="w-52 border-r border-white/[0.06] bg-[#0a0a0f] hidden md:flex flex-col">
              <div className="p-3 border-b border-white/[0.06]">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="w-3 h-3 text-white" />
                  </div>
                  <span className="text-[13px] font-semibold">NexusAI</span>
                </div>
              </div>
              <div className="p-2">
                <div className="px-2.5 py-2 bg-violet-600/10 border border-violet-500/10 text-violet-300 rounded-lg text-[12px] font-medium flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> New Chat
                </div>
              </div>
              <div className="p-2 space-y-0.5 flex-1">
                {["Auth middleware", "API optimization", "React hooks", "DB migration"].map((t, i) => (
                  <div key={t} className={`px-2.5 py-1.5 rounded-md text-[11px] flex items-center gap-2 ${i === 0 ? "bg-white/[0.04] text-zinc-300" : "text-zinc-600"}`}>
                    <MessageSquare className="w-2.5 h-2.5 opacity-40" />
                    <span className="truncate">{t}</span>
                  </div>
                ))}
              </div>
              <div className="p-2 border-t border-white/[0.06]">
                <div className="px-2.5 py-1.5 text-[11px] text-emerald-500/70 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Ollama Connected
                </div>
              </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col">
              {/* Model bar */}
              <div className="flex items-center gap-2 px-4 py-2 border-b border-white/[0.06] bg-white/[0.02]">
                <div className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span className="text-[11px] text-zinc-400">Claude</span>
                <span className="text-[11px] text-zinc-600">·</span>
                <span className="text-[11px] text-zinc-500">Sonnet 4</span>
              </div>

              {/* Chat messages */}
              <div className="flex-1 p-5 space-y-4 overflow-hidden">
                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-white/[0.06] flex items-center justify-center flex-shrink-0 text-[10px] font-bold text-zinc-500">U</div>
                  <div className="bg-white/[0.04] border border-white/[0.06] rounded-xl rounded-tl-sm px-3.5 py-2.5 text-[13px] text-zinc-300 max-w-[85%]">
                    Build a REST API with Express that handles JWT authentication and role-based access control
                  </div>
                </div>

                <div className="flex gap-3">
                  <div className="w-6 h-6 rounded-md bg-violet-500/10 flex items-center justify-center flex-shrink-0 border border-violet-500/20">
                    <Sparkles className="w-3 h-3 text-violet-400" />
                  </div>
                  <div className="flex-1 max-w-[90%] space-y-3">
                    {/* Agent activity steps */}
                    <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                      <div className="space-y-1.5">
                        {mounted && AGENT_STEPS.map((step, i) => (
                          <div
                            key={i}
                            className={`flex items-center gap-2 text-[12px] font-mono transition-all duration-300 ${
                              i < activeStep ? "text-zinc-600" : i === activeStep ? "text-violet-400" : "text-zinc-800"
                            }`}
                          >
                            {i < activeStep ? (
                              <Check className="w-3 h-3 text-emerald-500/60" />
                            ) : i === activeStep ? (
                              <div className="w-3 h-3 border border-violet-500/50 border-t-transparent rounded-full animate-spin" />
                            ) : (
                              <div className="w-3 h-3 rounded-full border border-zinc-800" />
                            )}
                            {step.text}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Input */}
              <div className="p-3 border-t border-white/[0.06]">
                <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.08] rounded-xl px-4 py-2.5">
                  <span className="flex-1 text-[13px] text-zinc-600">Ask anything...</span>
                  <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                    <ArrowRight className="w-3 h-3 text-black" />
                  </div>
                </div>
              </div>
            </div>

            {/* Right panel - Editor mock */}
            <div className="w-[280px] border-l border-white/[0.06] hidden lg:flex flex-col bg-[#0a0a0f]">
              <div className="flex items-center gap-2 px-3 py-2 border-b border-white/[0.06] text-[11px]">
                <Code2 className="w-3 h-3 text-zinc-500" />
                <span className="text-zinc-400">Editor</span>
                <span className="ml-auto text-zinc-600 font-mono">typescript</span>
              </div>
              <div className="flex-1 p-3 font-mono text-[11px] leading-relaxed overflow-hidden">
                <div className="text-zinc-700">1</div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-300">express</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;express&apos;</span></div>
                <div><span className="text-purple-400">import</span> <span className="text-blue-300">jwt</span> <span className="text-purple-400">from</span> <span className="text-green-400">&apos;jsonwebtoken&apos;</span></div>
                <div className="text-zinc-700 mt-2">3</div>
                <div><span className="text-purple-400">const</span> <span className="text-yellow-300">authenticate</span> = <span className="text-zinc-400">(</span><span className="text-orange-300">req</span><span className="text-zinc-400">,</span> <span className="text-orange-300">res</span><span className="text-zinc-400">,</span> <span className="text-orange-300">next</span><span className="text-zinc-400">) =&gt; {'{'}</span></div>
                <div>  <span className="text-purple-400">const</span> <span className="text-blue-300">token</span> = <span className="text-orange-300">req</span>.headers[<span className="text-green-400">&apos;authorization&apos;</span>]</div>
                <div>  <span className="text-purple-400">if</span> (!token) <span className="text-purple-400">return</span> <span className="text-orange-300">res</span>.<span className="text-yellow-300">status</span>(<span className="text-cyan-400">401</span>)</div>
                <div>  <span className="text-purple-400">try</span> {'{'}</div>
                <div>    <span className="text-orange-300">req</span>.user = jwt.<span className="text-yellow-300">verify</span>(token, SECRET)</div>
                <div>    <span className="text-yellow-300">next</span>()</div>
                <div>  {'}'} <span className="text-purple-400">catch</span> {'{'} <span className="text-orange-300">res</span>.<span className="text-yellow-300">status</span>(<span className="text-cyan-400">403</span>) {'}'}</div>
                <div>{'}'}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Everything you need
          </h2>
          <p className="text-zinc-500 text-base max-w-lg mx-auto">
            A complete AI workspace with the tools developers actually use
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="group rounded-xl border border-white/[0.06] bg-white/[0.02] p-5 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300"
            >
              <f.icon className="w-5 h-5 text-zinc-500 mb-3 group-hover:text-zinc-300 transition-colors" />
              <h3 className="text-[15px] font-semibold mb-1.5 text-zinc-200">{f.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Providers */}
      <section id="providers" className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Any model, one interface
          </h2>
          <p className="text-zinc-500 text-base max-w-lg mx-auto">
            From cloud APIs to local inference — BYOK, switch instantly
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          {PROVIDERS.map((p) => (
            <div
              key={p.name}
              className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-4 hover:bg-white/[0.04] hover:border-white/[0.1] transition-all duration-300 group"
            >
              <div className="flex items-center gap-2 mb-2.5">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.accent }} />
                <span className="text-[13px] font-semibold text-zinc-200">{p.name}</span>
                <span className="text-[10px] text-zinc-600 ml-auto">{p.by}</span>
              </div>
              <div className="flex flex-wrap gap-1">
                {p.models.map((m) => (
                  <span key={m} className="px-1.5 py-0.5 rounded text-[10px] bg-white/[0.04] text-zinc-500 border border-white/[0.04]">
                    {m}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pb-32">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
            Works like Devin
          </h2>
          <p className="text-zinc-500 text-base max-w-lg mx-auto">
            Multi-panel workspace with chat, code editor, browser, and terminal
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {[
            { num: "01", title: "Configure", desc: "Add your API key or connect Ollama. Switch providers anytime.", icon: Key },
            { num: "02", title: "Chat & Code", desc: "Ask anything. Get code with syntax highlighting and one-click copy.", icon: MessageSquare },
            { num: "03", title: "Multi-Panel", desc: "Toggle editor, browser, terminal. Work across panels simultaneously.", icon: Layers },
          ].map((s) => (
            <div key={s.num} className="rounded-xl border border-white/[0.06] bg-white/[0.02] p-6 hover:bg-white/[0.04] transition-all">
              <div className="text-[11px] text-violet-400 font-mono mb-3">{s.num}</div>
              <s.icon className="w-5 h-5 text-zinc-400 mb-3" />
              <h3 className="text-[15px] font-semibold mb-1.5 text-zinc-200">{s.title}</h3>
              <p className="text-[13px] text-zinc-500 leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-3xl mx-auto px-6 pb-32 text-center">
        <div className="rounded-xl border border-white/[0.08] bg-gradient-to-b from-violet-600/[0.08] to-transparent p-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">Ready to build?</h2>
          <p className="text-zinc-500 mb-8 max-w-md mx-auto text-base">
            Open-source, privacy-first, completely free. Bring your own keys.
          </p>
          <Link
            href="/chat"
            className="group inline-flex items-center gap-2 px-7 py-3 bg-white text-black rounded-xl text-sm font-medium hover:bg-zinc-100 transition-all"
          >
            Launch NexusAI
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </Link>
          <p className="text-[12px] text-zinc-700 mt-4">Free forever · No account required · Your data stays local</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-6 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-2.5 h-2.5 text-white" />
            </div>
            <span className="text-[12px] text-zinc-600">NexusAI · Open-Source AI Platform</span>
          </div>
          <div className="flex items-center gap-5 text-[12px] text-zinc-600">
            <a href="https://github.com/sourakahamida9-ui/SAVIOUS" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Claude</a>
            <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Ollama</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
