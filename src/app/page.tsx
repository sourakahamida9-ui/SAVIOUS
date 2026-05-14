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
  Cpu,
  Download,
  Shield,
  History,
  Terminal,
  Layers,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const FEATURES = [
  {
    icon: MessageSquare,
    title: "Intelligent Conversations",
    desc: "Chat with Claude AI using streaming responses. Support for Sonnet 4, Opus 4, and Haiku models with real-time markdown rendering.",
    color: "from-indigo-500 to-violet-500",
  },
  {
    icon: Globe,
    title: "Embedded Browser",
    desc: "Browse the web directly within the platform. Research documentation, test websites, and reference resources without leaving.",
    color: "from-cyan-500 to-blue-500",
  },
  {
    icon: Key,
    title: "Bring Your Own Key",
    desc: "Use your own Anthropic API key. Your key stays in your browser and is never stored on our servers. Full privacy guaranteed.",
    color: "from-amber-500 to-orange-500",
  },
  {
    icon: Code2,
    title: "Code Syntax Highlighting",
    desc: "Beautiful code blocks with syntax highlighting for 100+ languages, one-click copy, and language detection.",
    color: "from-emerald-500 to-teal-500",
  },
  {
    icon: History,
    title: "Persistent Chat History",
    desc: "All conversations are saved automatically. Switch between chats, pick up where you left off, and export conversations as Markdown.",
    color: "from-rose-500 to-pink-500",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    desc: "Built on Next.js 16 with Turbopack. Streaming responses appear in real-time as Claude generates them.",
    color: "from-yellow-500 to-amber-500",
  },
];

const TECH_STACK = [
  { name: "Next.js 16", desc: "App Router + Turbopack" },
  { name: "React 19", desc: "Server & Client Components" },
  { name: "TypeScript", desc: "Full type safety" },
  { name: "Tailwind CSS v4", desc: "Utility-first styling" },
  { name: "Vercel AI SDK", desc: "Streaming AI responses" },
  { name: "Claude API", desc: "Anthropic's best models" },
];

const USE_CASES = [
  {
    title: "Code Generation & Debugging",
    items: ["Generate code in any language", "Debug complex issues with context", "Explain and refactor existing code"],
    icon: Terminal,
  },
  {
    title: "Research & Analysis",
    items: ["Research topics with the embedded browser", "Analyze data and create summaries", "Compare documentation across sources"],
    icon: Layers,
  },
  {
    title: "Content & Communication",
    items: ["Draft emails, articles, and reports", "Translate between languages", "Create presentations and documentation"],
    icon: Bot,
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/[0.03] rounded-full blur-3xl" />
        <div className="absolute top-1/3 right-0 w-[400px] h-[400px] bg-violet-500/[0.02] rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[400px] bg-cyan-500/[0.02] rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold">NexusAI</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            <a href="#features" className="hover:text-foreground transition-colors">Features</a>
            <a href="#use-cases" className="hover:text-foreground transition-colors">Use Cases</a>
            <a href="#tech" className="hover:text-foreground transition-colors">Tech Stack</a>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors px-4 py-2"
            >
              Login
            </Link>
            <Link
              href="/chat"
              className="px-5 py-2.5 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full text-sm font-medium transition-all hover:shadow-lg hover:shadow-primary/25"
            >
              Get started
            </Link>
          </div>
        </div>
      </nav>

      {/* Announcement Banner */}
      <div className="relative z-10 flex justify-center pt-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm">
          <span className="px-2 py-0.5 bg-primary text-white text-xs font-bold rounded-full">NEW</span>
          Powered by Claude Sonnet 4 & Opus 4
          <ChevronRight className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Hero */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 pt-12 pb-20 text-center">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-[1.1] tracking-tight">
          NexusAI, your AI
          <br />
          <span className="gradient-text">assistant platform</span>
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          A complete AI-powered workspace with Claude integration, embedded browser,
          and persistent chat history. Bring your own API key and start building.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/chat"
            className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-primary/25 hover:scale-[1.02]"
          >
            Start for Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="https://github.com/sourakahamida9-ui/SAVIOUS"
            className="flex items-center gap-2 px-8 py-4 border border-border hover:bg-card rounded-full text-sm font-medium transition-all hover:border-border-hover"
          >
            View on GitHub
          </Link>
        </div>
      </section>

      {/* Product Preview */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
        <div className="rounded-2xl border border-border overflow-hidden shadow-2xl shadow-black/20">
          <div className="bg-card border-b border-border px-4 py-2.5 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
            </div>
            <div className="flex-1 flex justify-center">
              <div className="px-4 py-1 bg-input rounded-lg text-xs text-muted-foreground">
                nexusai.app
              </div>
            </div>
          </div>
          <div className="bg-background p-1">
            <div className="flex h-[400px] md:h-[500px]">
              {/* Mock Sidebar */}
              <div className="w-56 bg-sidebar border-r border-border flex-shrink-0 hidden md:flex flex-col">
                <div className="p-3 border-b border-border flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  <span className="text-sm font-semibold gradient-text">NexusAI</span>
                </div>
                <div className="p-2">
                  <div className="px-3 py-2 bg-primary text-primary-foreground rounded-lg text-xs font-medium flex items-center gap-2">
                    <MessageSquare className="w-3 h-3" /> New Chat
                  </div>
                </div>
                <div className="p-2 space-y-0.5 flex-1">
                  {["Explain quantum computing", "Python web scraper", "Debug React hooks"].map((t) => (
                    <div key={t} className="px-3 py-2 rounded-lg text-xs text-muted-foreground truncate hover:bg-sidebar-hover transition-colors cursor-default">
                      {t}
                    </div>
                  ))}
                </div>
                <div className="p-2 border-t border-border space-y-0.5">
                  <div className="px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
                    <Globe className="w-3 h-3" /> Browser
                  </div>
                  <div className="px-3 py-2 rounded-lg text-xs text-muted-foreground flex items-center gap-2">
                    <Cpu className="w-3 h-3" /> Settings
                  </div>
                </div>
              </div>
              {/* Mock Chat */}
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-hidden p-6 space-y-4">
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center flex-shrink-0">
                      <span className="text-xs">U</span>
                    </div>
                    <div className="bg-card border border-border rounded-xl rounded-tl-sm px-4 py-2.5 text-sm max-w-md">
                      Write me a Python function that sorts a list using merge sort
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <Sparkles className="w-3.5 h-3.5 text-primary" />
                    </div>
                    <div className="space-y-2 max-w-lg">
                      <div className="text-sm text-foreground">Here&apos;s a merge sort implementation:</div>
                      <div className="bg-[#0d1117] border border-border rounded-xl overflow-hidden">
                        <div className="flex items-center justify-between px-4 py-1.5 border-b border-border text-xs text-muted-foreground">
                          <span>python</span>
                          <span className="flex items-center gap-1"><Download className="w-3 h-3" /> Copy</span>
                        </div>
                        <pre className="p-4 text-xs leading-relaxed font-mono">
                          <code className="text-emerald-400">def</code>{" "}
                          <code className="text-blue-400">merge_sort</code>
                          <code className="text-muted-foreground">(arr):</code>{"\n"}
                          {"    "}<code className="text-violet-400">if</code>{" "}
                          <code className="text-muted-foreground">len(arr) {"<="} 1:</code>{"\n"}
                          {"        "}<code className="text-violet-400">return</code>{" "}
                          <code className="text-muted-foreground">arr</code>{"\n"}
                          {"    "}<code className="text-muted-foreground">mid = len(arr) // 2</code>{"\n"}
                          {"    "}<code className="text-muted-foreground">left = merge_sort(arr[:mid])</code>{"\n"}
                          {"    "}<code className="text-muted-foreground">right = merge_sort(arr[mid:])</code>{"\n"}
                          {"    "}<code className="text-violet-400">return</code>{" "}
                          <code className="text-blue-400">merge</code>
                          <code className="text-muted-foreground">(left, right)</code>
                        </pre>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        This implementation has <code className="bg-accent px-1.5 py-0.5 rounded text-xs text-foreground">O(n log n)</code> time complexity.
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-4 border-t border-border">
                  <div className="flex items-center gap-3 max-w-2xl mx-auto">
                    <div className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm text-muted">
                      Type your message...
                    </div>
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything you need</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            A powerful AI platform built with the best open-source technologies
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group relative p-6 bg-card border border-border rounded-2xl hover:border-border-hover transition-all duration-300 hover:-translate-y-1"
            >
              <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-4 opacity-80 group-hover:opacity-100 transition-opacity`}>
                <Icon className="w-5 h-5 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Use Cases */}
      <section id="use-cases" className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Use cases</h2>
          <p className="text-muted-foreground max-w-xl mx-auto text-lg">
            Use NexusAI for code generation, research, content creation, and more
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {USE_CASES.map(({ title, items, icon: Icon }) => (
            <div key={title} className="p-6 bg-card border border-border rounded-2xl">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold text-lg mb-4">{title}</h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <ChevronRight className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech" className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-3">Built with modern tech</h2>
            <p className="text-muted-foreground">
              Open-source tools you know and love
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {TECH_STACK.map(({ name, desc }) => (
              <div
                key={name}
                className="p-4 bg-background border border-border rounded-xl text-center hover:border-border-hover transition-colors"
              >
                <div className="font-semibold text-sm">{name}</div>
                <div className="text-xs text-muted-foreground mt-1">{desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 py-24">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start building with <span className="gradient-text">NexusAI</span>
          </h2>
          <p className="text-muted-foreground text-lg mb-8 max-w-xl mx-auto">
            Get started for free. Just bring your Anthropic API key and start chatting with Claude.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link
              href="/chat"
              className="flex items-center gap-2 px-8 py-4 bg-primary hover:bg-primary-hover text-primary-foreground rounded-full text-sm font-semibold transition-all hover:shadow-xl hover:shadow-primary/25"
            >
              Get started
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="text-xs text-muted mt-4">
            Free to use · No credit card required · Your data stays private
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-md bg-primary flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-muted-foreground">
              NexusAI — Open Source AI Platform
            </span>
          </div>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="https://github.com/sourakahamida9-ui/SAVIOUS" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              GitHub
            </a>
            <a href="https://docs.anthropic.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">
              Claude Docs
            </a>
            <Link href="/auth/login" className="hover:text-foreground transition-colors">
              Sign In
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
