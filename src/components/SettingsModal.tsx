"use client";

import { useState } from "react";
import { X, Key, Eye, EyeOff, CheckCircle, AlertCircle, Server, Brain, Blocks } from "lucide-react";
import type { Provider } from "@/types";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  model: string;
  provider: Provider;
  ollamaEndpoint: string;
  openaiEndpoint: string;
  openaiApiKey: string;
  onSave: (settings: {
    apiKey: string;
    model: string;
    provider: Provider;
    ollamaEndpoint: string;
    openaiEndpoint: string;
    openaiApiKey: string;
  }) => void;
}

const PROVIDERS = [
  {
    id: "claude" as Provider,
    name: "Claude",
    desc: "Anthropic's models via API key",
    icon: Brain,
    color: "text-amber-400",
    bg: "bg-amber-500/10 border-amber-500/20",
    activeBg: "bg-amber-500/20 border-amber-500/40",
  },
  {
    id: "ollama" as Provider,
    name: "Ollama",
    desc: "Local models — no API key needed",
    icon: Server,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10 border-emerald-500/20",
    activeBg: "bg-emerald-500/20 border-emerald-500/40",
  },
  {
    id: "openai-compatible" as Provider,
    name: "OpenAI-Compatible",
    desc: "Any OpenAI-compatible endpoint",
    icon: Blocks,
    color: "text-blue-400",
    bg: "bg-blue-500/10 border-blue-500/20",
    activeBg: "bg-blue-500/20 border-blue-500/40",
  },
];

const CLAUDE_MODELS = [
  { id: "claude-sonnet-4-20250514", name: "Claude Sonnet 4", desc: "Best balance of speed & intelligence" },
  { id: "claude-opus-4-20250514", name: "Claude Opus 4", desc: "Most capable for complex tasks" },
  { id: "claude-3-5-haiku-20241022", name: "Claude 3.5 Haiku", desc: "Fastest model for simple tasks" },
];

const OLLAMA_MODELS = [
  { id: "llama3.2", name: "Llama 3.2", desc: "Meta's latest open model" },
  { id: "mistral", name: "Mistral", desc: "Fast and efficient" },
  { id: "gemma2", name: "Gemma 2", desc: "Google's open model" },
  { id: "phi4", name: "Phi-4", desc: "Microsoft's compact model" },
  { id: "qwen2.5", name: "Qwen 2.5", desc: "Alibaba's open model" },
  { id: "deepseek-r1", name: "DeepSeek R1", desc: "Reasoning model" },
  { id: "codellama", name: "Code Llama", desc: "Optimized for code" },
];

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  model,
  provider,
  ollamaEndpoint,
  openaiEndpoint,
  openaiApiKey,
  onSave,
}: SettingsModalProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localModel, setLocalModel] = useState(model);
  const [localProvider, setLocalProvider] = useState<Provider>(provider);
  const [localOllamaEndpoint, setLocalOllamaEndpoint] = useState(ollamaEndpoint || "http://localhost:11434");
  const [localOpenAIEndpoint, setLocalOpenAIEndpoint] = useState(openaiEndpoint);
  const [localOpenAIApiKey, setLocalOpenAIApiKey] = useState(openaiApiKey);
  const [showKey, setShowKey] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleProviderChange = (p: Provider) => {
    setLocalProvider(p);
    if (p === "claude" && !CLAUDE_MODELS.some((m) => m.id === localModel)) {
      setLocalModel(CLAUDE_MODELS[0].id);
    } else if (p === "ollama" && !OLLAMA_MODELS.some((m) => m.id === localModel)) {
      setLocalModel(OLLAMA_MODELS[0].id);
    }
  };

  const handleSave = () => {
    onSave({
      apiKey: localApiKey,
      model: localModel,
      provider: localProvider,
      ollamaEndpoint: localOllamaEndpoint,
      openaiEndpoint: localOpenAIEndpoint,
      openaiApiKey: localOpenAIApiKey,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 800);
  };

  const models = localProvider === "claude" ? CLAUDE_MODELS : localProvider === "ollama" ? OLLAMA_MODELS : [];
  const isConfigured =
    localProvider === "claude" ? !!localApiKey :
    localProvider === "ollama" ? !!localOllamaEndpoint :
    !!localOpenAIEndpoint;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border sticky top-0 bg-card z-10 rounded-t-2xl">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-6">
          {/* Provider Selection */}
          <div>
            <label className="text-sm font-medium mb-3 block text-muted-foreground uppercase tracking-wider text-xs">
              Provider
            </label>
            <div className="grid grid-cols-3 gap-2">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`flex flex-col items-center gap-2 p-3 rounded-xl border text-center transition-all ${
                    localProvider === p.id ? p.activeBg : `${p.bg} hover:opacity-80`
                  }`}
                >
                  <p.icon className={`w-5 h-5 ${p.color}`} />
                  <span className="text-xs font-medium">{p.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Claude API Key */}
          {localProvider === "claude" && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Key className="w-4 h-4 text-amber-400" />
                Anthropic API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  placeholder="sk-ant-api03-..."
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="mt-1.5 text-xs text-muted-foreground">
                Get your key from{" "}
                <a href="https://console.anthropic.com/settings/keys" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  console.anthropic.com
                </a>
              </p>
            </div>
          )}

          {/* Ollama Endpoint */}
          {localProvider === "ollama" && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Server className="w-4 h-4 text-emerald-400" />
                Ollama Endpoint
              </label>
              <input
                type="text"
                value={localOllamaEndpoint}
                onChange={(e) => setLocalOllamaEndpoint(e.target.value)}
                placeholder="http://localhost:11434"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
              <p className="mt-1.5 text-xs text-muted-foreground">
                Install Ollama from{" "}
                <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                  ollama.com
                </a>
                {" "}then run <code className="px-1 py-0.5 bg-accent rounded text-xs">ollama serve</code>
              </p>
            </div>
          )}

          {/* OpenAI-Compatible */}
          {localProvider === "openai-compatible" && (
            <>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Blocks className="w-4 h-4 text-blue-400" />
                  API Endpoint
                </label>
                <input
                  type="text"
                  value={localOpenAIEndpoint}
                  onChange={(e) => setLocalOpenAIEndpoint(e.target.value)}
                  placeholder="https://api.example.com/v1"
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-medium mb-2">
                  <Key className="w-4 h-4 text-blue-400" />
                  API Key (optional)
                </label>
                <div className="relative">
                  <input
                    type={showOpenAIKey ? "text" : "password"}
                    value={localOpenAIApiKey}
                    onChange={(e) => setLocalOpenAIApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="w-full bg-input border border-border rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                  />
                  <button
                    type="button"
                    onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                  >
                    {showOpenAIKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </>
          )}

          {/* Model Selection */}
          {models.length > 0 && (
            <div>
              <label className="text-sm font-medium mb-2 block">Model</label>
              <div className="space-y-1.5">
                {models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setLocalModel(m.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-xl border text-left transition-all ${
                      localModel === m.id
                        ? "border-primary/50 bg-primary/5"
                        : "border-border hover:border-border-hover hover:bg-card-hover"
                    }`}
                  >
                    <div
                      className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 transition-colors ${
                        localModel === m.id ? "border-primary bg-primary" : "border-muted"
                      }`}
                    >
                      {localModel === m.id && (
                        <div className="w-full h-full rounded-full flex items-center justify-center">
                          <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Custom model for openai-compatible */}
          {localProvider === "openai-compatible" && (
            <div>
              <label className="text-sm font-medium mb-2 block">Model Name</label>
              <input
                type="text"
                value={localModel}
                onChange={(e) => setLocalModel(e.target.value)}
                placeholder="gpt-4, llama-3, etc."
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-border sticky bottom-0 bg-card rounded-b-2xl">
          <div className="flex items-center gap-1.5 text-xs">
            {isConfigured ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-success" />
                <span className="text-success">Ready</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-warning" />
                <span className="text-warning">Configuration needed</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2 text-sm font-medium rounded-xl transition-all ${
                saved ? "bg-success text-white" : "bg-primary hover:bg-primary-hover text-primary-foreground"
              }`}
            >
              {saved ? "Saved!" : "Save"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
