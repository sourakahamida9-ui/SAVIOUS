"use client";

import { useState, useRef } from "react";
import {
  Globe,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  X,
  ExternalLink,
  Search,
  Home,
  Shield,
} from "lucide-react";

interface EmbeddedBrowserProps {
  onClose: () => void;
}

const BOOKMARKS = [
  { name: "Google", url: "https://www.google.com/webhp?igu=1" },
  { name: "Wikipedia", url: "https://en.m.wikipedia.org" },
  { name: "MDN Docs", url: "https://developer.mozilla.org" },
  { name: "GitHub", url: "https://github.com" },
  { name: "Stack Overflow", url: "https://stackoverflow.com" },
  { name: "Claude", url: "https://docs.anthropic.com" },
];

export default function EmbeddedBrowser({ onClose }: EmbeddedBrowserProps) {
  const [url, setUrl] = useState("https://www.google.com/webhp?igu=1");
  const [inputUrl, setInputUrl] = useState("https://www.google.com/webhp?igu=1");
  const [isLoading, setIsLoading] = useState(true);
  const [history, setHistory] = useState<string[]>([
    "https://www.google.com/webhp?igu=1",
  ]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const navigate = (newUrl: string) => {
    let processedUrl = newUrl;
    if (
      !processedUrl.startsWith("http://") &&
      !processedUrl.startsWith("https://")
    ) {
      if (processedUrl.includes(".") && !processedUrl.includes(" ")) {
        processedUrl = "https://" + processedUrl;
      } else {
        processedUrl = `https://www.google.com/search?igu=1&q=${encodeURIComponent(processedUrl)}`;
      }
    }
    setUrl(processedUrl);
    setInputUrl(processedUrl);
    setIsLoading(true);
    const newHistory = [...history.slice(0, historyIndex + 1), processedUrl];
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const goBack = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const goForward = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setUrl(history[newIndex]);
      setInputUrl(history[newIndex]);
      setIsLoading(true);
    }
  };

  const refresh = () => {
    setIsLoading(true);
    if (iframeRef.current) {
      iframeRef.current.src = url;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(inputUrl);
  };

  return (
    <div className="flex flex-col h-full border-l border-border bg-background">
      {/* Browser Toolbar */}
      <div className="flex items-center gap-1 p-2 border-b border-border bg-card">
        <div className="flex items-center gap-0.5">
          <button
            onClick={goBack}
            disabled={historyIndex <= 0}
            className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goForward}
            disabled={historyIndex >= history.length - 1}
            className="p-1.5 rounded-lg hover:bg-accent disabled:opacity-30 disabled:cursor-not-allowed transition-colors text-muted-foreground hover:text-foreground"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={refresh}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <RotateCw
              className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </button>
          <button
            onClick={() => navigate("https://www.google.com/webhp?igu=1")}
            className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
          >
            <Home className="w-4 h-4" />
          </button>
        </div>

        {/* URL Bar */}
        <form onSubmit={handleSubmit} className="flex-1 mx-1">
          <div className="flex items-center bg-input border border-border rounded-lg px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:border-transparent">
            {url.startsWith("https://") ? (
              <Shield className="w-3.5 h-3.5 text-success mr-2 flex-shrink-0" />
            ) : (
              <Globe className="w-3.5 h-3.5 text-muted mr-2 flex-shrink-0" />
            )}
            <input
              type="text"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
              className="w-full bg-transparent text-sm text-foreground focus:outline-none placeholder:text-muted"
              placeholder="Search or enter URL"
            />
            <button
              type="submit"
              className="ml-1 p-0.5 hover:text-primary transition-colors text-muted"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>

        <div className="flex items-center gap-0.5">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg hover:bg-accent transition-colors text-muted-foreground hover:text-foreground"
            title="Open in new tab"
          >
            <ExternalLink className="w-4 h-4" />
          </a>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-destructive/20 hover:text-destructive transition-colors text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Bookmarks Bar */}
      <div className="flex items-center gap-1 px-2 py-1.5 border-b border-border bg-card/50 overflow-x-auto">
        {BOOKMARKS.map((bookmark) => (
          <button
            key={bookmark.name}
            onClick={() => navigate(bookmark.url)}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs text-muted-foreground hover:bg-accent hover:text-foreground transition-colors whitespace-nowrap"
          >
            <Globe className="w-3 h-3" />
            {bookmark.name}
          </button>
        ))}
      </div>

      {/* iframe Content */}
      <div className="flex-1 relative bg-white">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background z-10">
            <div className="flex flex-col items-center gap-3">
              <RotateCw className="w-6 h-6 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Loading...</span>
            </div>
          </div>
        )}
        <iframe
          ref={iframeRef}
          src={url}
          className="w-full h-full border-0"
          onLoad={() => setIsLoading(false)}
          sandbox="allow-same-origin allow-scripts allow-popups allow-forms allow-modals"
          title="Embedded Browser"
        />
      </div>
    </div>
  );
}
