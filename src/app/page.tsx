"use client";

import {
  Sparkles,
  MessageSquare,
  Globe,
  Key,
  Shield,
  Zap,
  ArrowRight,
  ExternalLink,
  Database,
} from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Background effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-[600px] h-[400px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 border-b border-border/50 glass">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-6 h-6 text-primary" />
            <span className="text-xl font-bold gradient-text">NexusAI</span>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/login"
              className="px-5 py-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl text-sm font-medium transition-colors"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm mb-8">
          <Sparkles className="w-3.5 h-3.5" />
          Powered by Claude AI
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
          Your AI Assistant
          <br />
          <span className="gradient-text">Platform</span>
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10">
          A complete AI-powered workspace with Claude integration, embedded
          browser, and secure authentication. Bring your own API key and start
          building.
        </p>
        <div className="flex items-center justify-center gap-4">
          <Link
            href="/auth/login"
            className="flex items-center gap-2 px-8 py-3.5 bg-primary hover:bg-primary-hover text-primary-foreground rounded-xl text-sm font-semibold transition-all hover:scale-105"
          >
            Start for Free
            <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href="https://docs.anthropic.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-8 py-3.5 border border-border hover:bg-card-hover rounded-xl text-sm font-medium transition-colors"
          >
            Learn More
          </a>
        </div>
      </section>

      {/* Features */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Everything You Need</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A modern AI platform built with the best open-source technologies
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: MessageSquare,
              title: "AI Chat with Claude",
              desc: "Have intelligent conversations powered by Claude. Support for multiple models including Sonnet 4 and Opus 4.",
            },
            {
              icon: Globe,
              title: "Embedded Browser",
              desc: "Browse the web directly within the platform. Research, reference documentation, and test websites without leaving.",
            },
            {
              icon: Key,
              title: "Bring Your Own Key",
              desc: "Use your own Anthropic API key. Your key stays in your browser — never stored on our servers.",
            },
            {
              icon: Shield,
              title: "Secure Auth",
              desc: "Authentication powered by Supabase with email/password, Google, and GitHub OAuth support.",
            },
            {
              icon: Database,
              title: "Chat History",
              desc: "All your conversations are saved securely in Supabase. Pick up where you left off, anytime.",
            },
            {
              icon: Zap,
              title: "Lightning Fast",
              desc: "Built on Next.js with streaming responses. Real-time markdown rendering as Claude thinks.",
            },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="p-6 bg-card border border-border rounded-2xl hover:border-border-hover transition-all hover:-translate-y-1 group"
            >
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Tech Stack */}
      <section className="relative z-10 max-w-6xl mx-auto px-6 py-20">
        <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center">
          <h2 className="text-2xl font-bold mb-3">Built with Modern Tech</h2>
          <p className="text-muted-foreground mb-8">
            Open-source tools you know and love
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS v4",
              "Supabase",
              "Vercel AI SDK",
              "Claude API",
            ].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-accent border border-border rounded-xl text-sm font-medium"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border/50 py-8">
        <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Sparkles className="w-4 h-4 text-primary" />
            NexusAI — Open Source AI Platform
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            <ExternalLink className="w-5 h-5" />
          </a>
        </div>
      </footer>
    </div>
  );
}
