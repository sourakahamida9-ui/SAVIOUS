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
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl mx-4 max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-6">
          {/* Provider Grid */}
          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-3 block">
              AI Provider
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-1.5">
              {PROVIDERS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => handleProviderChange(p.id)}
                  className={`flex flex-col items-center gap-1.5 p-2.5 rounded-xl border text-center transition-all text-xs ${
                    localProvider === p.id
                      ? `${p.activeBg}`
                      : `${p.bgColor} ${p.borderColor} hover:opacity-80`
                  }`}
                >
                  <span className={`font-semibold ${p.color}`}>{p.name}</span>
                </button>
              ))}
            </div>
            <p className="text-[11px] text-muted-foreground mt-2">{config.description}</p>
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
                  className="w-full bg-input border border-border rounded-xl px-4 py-3 pr-12 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
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
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
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
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
              />
            </div>
          )}

          {/* Model Selection */}
          {config.models.length > 0 ? (
            <div>
              <label className="text-sm font-medium mb-2 block">Model</label>
              <div className="space-y-1.5">
                {config.models.map((m) => (
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
                      className={`w-3 h-3 rounded-full border-2 flex-shrink-0 ${
                        localModel === m.id ? "border-primary bg-primary" : "border-muted"
                      }`}
                    />
                    <div>
                      <div className="text-sm font-medium">{m.name}</div>
                      <div className="text-xs text-muted-foreground">{m.desc}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <label className="text-sm font-medium mb-2 block">Model Name</label>
              <input
                type="text"
                value={localModel}
                onChange={(e) => setLocalModel(e.target.value)}
                placeholder="model-name"
                className="w-full bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent font-mono"
              />
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-border">
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
            <button onClick={onClose} className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground rounded-lg transition-colors">
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
