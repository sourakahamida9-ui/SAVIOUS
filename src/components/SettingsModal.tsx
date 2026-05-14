"use client";

import { useState } from "react";
import { X, Key, Eye, EyeOff, CheckCircle, AlertCircle } from "lucide-react";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  apiKey: string;
  model: string;
  onSave: (apiKey: string, model: string) => void;
}

const MODELS = [
  {
    id: "claude-sonnet-4-20250514",
    name: "Claude Sonnet 4",
    desc: "Best balance of speed and intelligence",
  },
  {
    id: "claude-opus-4-20250514",
    name: "Claude Opus 4",
    desc: "Most capable model for complex tasks",
  },
  {
    id: "claude-3-5-haiku-20241022",
    name: "Claude 3.5 Haiku",
    desc: "Fastest model for simple tasks",
  },
];

export default function SettingsModal({
  isOpen,
  onClose,
  apiKey,
  model,
  onSave,
}: SettingsModalProps) {
  const [localApiKey, setLocalApiKey] = useState(apiKey);
  const [localModel, setLocalModel] = useState(model || MODELS[0].id);
  const [showKey, setShowKey] = useState(false);
  const [saved, setSaved] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    onSave(localApiKey, localModel);
    setSaved(true);
    setTimeout(() => {
      setSaved(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative w-full max-w-lg bg-card border border-border rounded-2xl shadow-2xl mx-4">
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-border">
          <h2 className="text-lg font-semibold">Settings</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 space-y-6">
          {/* API Key */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2">
              <Key className="w-4 h-4 text-primary" />
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
                {showKey ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
            <p className="mt-1.5 text-xs text-muted-foreground">
              Get your API key from{" "}
              <a
                href="https://console.anthropic.com/settings/keys"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                console.anthropic.com
              </a>
              . Your key is stored locally and never sent to our servers.
            </p>
          </div>

          {/* Model Selection */}
          <div>
            <label className="text-sm font-medium mb-2 block">
              Model
            </label>
            <div className="space-y-2">
              {MODELS.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setLocalModel(m.id)}
                  className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                    localModel === m.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-border-hover hover:bg-card-hover"
                  }`}
                >
                  <div
                    className={`w-4 h-4 mt-0.5 rounded-full border-2 flex-shrink-0 transition-colors ${
                      localModel === m.id
                        ? "border-primary bg-primary"
                        : "border-muted"
                    }`}
                  >
                    {localModel === m.id && (
                      <div className="w-full h-full rounded-full flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-primary-foreground rounded-full" />
                      </div>
                    )}
                  </div>
                  <div>
                    <div className="text-sm font-medium">{m.name}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">
                      {m.desc}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-5 border-t border-border">
          <div className="flex items-center gap-1.5 text-xs">
            {localApiKey ? (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-success" />
                <span className="text-success">API key configured</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-3.5 h-3.5 text-warning" />
                <span className="text-warning">API key required</span>
              </>
            )}
          </div>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-lg"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className={`px-6 py-2 text-sm font-medium rounded-xl transition-all ${
                saved
                  ? "bg-success text-white"
                  : "bg-primary hover:bg-primary-hover text-primary-foreground"
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
