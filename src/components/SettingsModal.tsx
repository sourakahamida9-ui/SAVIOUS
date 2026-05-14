"use client";

import { useState } from "react";
import { X, Key, Eye, EyeOff, CheckCircle, AlertCircle, Server, ExternalLink } from "lucide-react";
import type { Provider } from "@/types";
import { PROVIDERS, getProviderConfig } from "@/lib/providers";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  model: string;
  provider: Provider;
  ollamaEndpoint: string;
  customEndpoint: string;
  customApiKey: string;
  onSave: (settings: {
    apiKey: string;
    model: string;
    provider: Provider;
    ollamaEndpoint: string;
    customEndpoint: string;
    customApiKey: string;
  }) => void;
}

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  model,
  provider,
  ollamaEndpoint,
  customEndpoint,
  customApiKey,
  onSave,
}: SettingsModalProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localModel, setLocalModel] = useState(model);
  const [localProvider, setLocalProvider] = useState<Provider>(provider);
  const [localOllamaEndpoint, setLocalOllamaEndpoint] = useState(ollamaEndpoint || "http://localhost:11434");
  const [localCustomEndpoint, setLocalCustomEndpoint] = useState(customEndpoint);
  const [localCustomApiKey, setLocalCustomApiKey] = useState(customApiKey);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const config = getProviderConfig(localProvider);

  const handleProviderChange = (p: Provider) => {
    setLocalProvider(p);
    const newConfig = getProviderConfig(p);
    if (newConfig.models.length > 0) {
      setLocalModel(newConfig.models[0].id);
    }
  };

  const handleSave = () => {
    onSave({
      apiKey: localApiKey,
      model: localModel,
      provider: localProvider,
      ollamaEndpoint: localOllamaEndpoint,
      customEndpoint: localCustomEndpoint,
      customApiKey: localCustomApiKey,
    });
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 600);
  };

  const needsEndpoint = localProvider === "ollama" || localProvider === "lmstudio" || localProvider === "custom";
  const endpointValue = localProvider === "ollama" ? localOllamaEndpoint : localCustomEndpoint;
  const setEndpointValue = (v: string) => {
    if (localProvider === "ollama") setLocalOllamaEndpoint(v);
    else setLocalCustomEndpoint(v);
  };

  const isConfigured =
    config.requiresApiKey ? !!localApiKey :
    needsEndpoint ? !!endpointValue :
    true;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-xl bg-[#0c0c10] border border-white/[0.08] rounded-xl shadow-2xl mx-4 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <h2 className="text-[15px] font-semibold">Settings</h2>
          <button onClick={onClose} className="p-1 rounded-md hover:bg-white/[0.06] transition-colors text-zinc-500 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-5">
          {/* Provider Grid */}
          <div>
            <label className="text-[11px] font-medium text-zinc-500 uppercase tracking-wider mb-2.5 block">
              AI Provider
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`flex flex-col items-center gap-1 py-2 px-1.5 rounded-lg border text-center transition-all text-[11px] ${
                    localProvider === p.id
                      ? "bg-white/[0.08] border-white/[0.15] text-white"
                      : "bg-white/[0.02] border-white/[0.04] text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-300"
                  }`}
                >
                  <span className="font-medium">{p.name}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-zinc-600 mt-2">{config.description}</p>
          </div>

          {/* API Key */}
          {config.requiresApiKey && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Key className={`w-4 h-4 ${config.color}`} />
                API Key
              </label>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  placeholder={config.keyPlaceholder || "Enter API key..."}
                  className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 pr-10 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] font-mono"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-foreground transition-colors"
                >
                  {showKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {config.keyLink && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Get your key from{" "}
                  <a
                    href={config.keyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-1"
                  >
                    {config.keyLinkLabel}
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </p>
              )}
            </div>
          )}

          {/* Endpoint */}
          {needsEndpoint && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Server className={`w-4 h-4 ${config.color}`} />
                Endpoint URL
              </label>
              <input
                type="text"
                value={endpointValue}
                onChange={(e) => setEndpointValue(e.target.value)}
                placeholder={config.defaultEndpoint || "https://api.example.com/v1"}
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] font-mono"
              />
              {localProvider === "ollama" && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Install from{" "}
                  <a href="https://ollama.com" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    ollama.com
                  </a>
                  , then run <code className="px-1 py-0.5 bg-accent rounded text-[11px]">ollama serve</code>
                </p>
              )}
              {localProvider === "lmstudio" && (
                <p className="mt-1.5 text-xs text-muted-foreground">
                  Download from{" "}
                  <a href="https://lmstudio.ai" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                    lmstudio.ai
                  </a>
                  , load a model and start the local server
                </p>
              )}
            </div>
          )}

          {/* Custom API Key */}
          {localProvider === "custom" && (
            <div>
              <label className="flex items-center gap-2 text-sm font-medium mb-2">
                <Key className="w-4 h-4 text-slate-400" />
                API Key (optional)
              </label>
              <input
                type="password"
                value={localCustomApiKey}
                onChange={(e) => setLocalCustomApiKey(e.target.value)}
                placeholder="Optional API key for the custom endpoint"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] font-mono"
              />
            </div>
          )}

          {/* Model Selection */}
          {config.models.length > 0 ? (
            <div>
              <label className="text-[13px] font-medium mb-2 block">Model</label>
              <div className="space-y-1">
                {config.models.map((m) => (
                  <button
                    key={m.id}
                    onClick={() => setLocalModel(m.id)}
                    className={`w-full flex items-center gap-3 p-2.5 rounded-lg border text-left transition-all ${
                      localModel === m.id
                        ? "border-white/[0.15] bg-white/[0.06]"
                        : "border-white/[0.04] hover:border-white/[0.1] hover:bg-white/[0.03]"
                    }`}
                  >
                    <div
                      className={`w-2.5 h-2.5 rounded-full border-2 flex-shrink-0 ${
                        localModel === m.id ? "border-violet-500 bg-violet-500" : "border-zinc-700"
                      }`}
                    />
                    <div>
                      <div className="text-[13px] font-medium">{m.name}</div>
                      <div className="text-[11px] text-zinc-600">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-[13px] font-medium mb-2 block">Model Name</label>
              <input
                type="text"
                value={localModel}
                onChange={(e) => setLocalModel(e.target.value)}
                placeholder="model-name"
                className="w-full bg-white/[0.03] border border-white/[0.08] rounded-lg px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-white/[0.2] font-mono"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-5 py-4 border-t border-white/[0.06]">
          <div className="flex items-center gap-1.5 text-[11px]">
            {isConfigured ? (
              <>
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span className="text-emerald-500">Ready</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3 h-3 text-amber-500" />
                <span className="text-amber-500">Configuration needed</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button onClick={onClose} className="px-3.5 py-1.5 text-[13px] text-zinc-500 hover:text-white rounded-md transition-colors">
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-5 py-1.5 text-[13px] font-medium rounded-lg transition-all ${
                saved ? "bg-emerald-600 text-white" : "bg-white text-black hover:bg-zinc-200"
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
