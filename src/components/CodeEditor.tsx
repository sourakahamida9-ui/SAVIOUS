"use client";

import { useState, useCallback } from "react";
import dynamic from "next/dynamic";
import { Code2, ChevronDown, Save, Copy, Check } from "lucide-react";
import { storage } from "@/lib/storage";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => (
    <div className="flex-1 flex items-center justify-center bg-[#1e1e1e]">
      <div className="flex flex-col items-center gap-2">
        <div className="w-6 h-6 border-2 border-violet-500 border-t-transparent rounded-full animate-spin" />
        <span className="text-xs text-muted-foreground">Loading editor...</span>
      </div>
    </div>
  ),
});

const LANGUAGES = [
  "typescript",
  "javascript",
  "python",
  "rust",
  "go",
  "java",
  "c",
  "cpp",
  "csharp",
  "html",
  "css",
  "json",
  "yaml",
  "markdown",
  "sql",
  "shell",
  "dockerfile",
];

interface CodeEditorProps {
  onClose?: () => void;
}

export default function CodeEditor({ onClose }: CodeEditorProps) {
  const [content, setContent] = useState(() => storage.getEditorContent());
  const [language, setLanguage] = useState(() => storage.getEditorLanguage());
  const [showLangMenu, setShowLangMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleChange = useCallback((value: string | undefined) => {
    const v = value || "";
    setContent(v);
    storage.setEditorContent(v);
  }, []);

  const handleLanguageChange = useCallback((lang: string) => {
    setLanguage(lang);
    storage.setEditorLanguage(lang);
    setShowLangMenu(false);
  }, []);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [content]);

  const handleSave = useCallback(() => {
    storage.setEditorContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  }, [content]);

  return (
    <div className="flex flex-col h-full bg-[#1e1e1e] border-l border-border">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-3 py-1.5 bg-surface border-b border-border">
        <div className="flex items-center gap-2">
          <Code2 className="w-3.5 h-3.5 text-violet-400" />
          <span className="text-xs font-medium text-foreground">Editor</span>
          <div className="relative">
            <button
              onClick={() => setShowLangMenu(!showLangMenu)}
              className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-card border border-border text-[11px] text-muted-foreground hover:text-foreground transition-colors"
            >
              {language}
              <ChevronDown className="w-3 h-3" />
            </button>
            {showLangMenu && (
              <div className="absolute top-full left-0 mt-1 w-36 bg-card border border-border rounded-lg shadow-xl z-20 max-h-48 overflow-y-auto">
                {LANGUAGES.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full text-left px-3 py-1.5 text-xs transition-colors ${
                      lang === language
                        ? "text-violet-400 bg-violet-500/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 px-2 py-1 rounded-md text-[11px] text-muted-foreground hover:text-foreground hover:bg-card-hover transition-colors"
          >
            {copied ? <Check className="w-3 h-3 text-success" /> : <Copy className="w-3 h-3" />}
            {copied ? "Copied" : "Copy"}
          </button>
          <button
            onClick={handleSave}
            className={`flex items-center gap-1 px-2 py-1 rounded-md text-[11px] transition-colors ${
              saved ? "text-success" : "text-muted-foreground hover:text-foreground hover:bg-card-hover"
            }`}
          >
            <Save className="w-3 h-3" />
            {saved ? "Saved" : "Save"}
          </button>
        </div>
      </div>

      {/* Editor */}
      <div className="flex-1">
        <MonacoEditor
          height="100%"
          language={language}
          value={content}
          onChange={handleChange}
          theme="vs-dark"
          options={{
            fontSize: 13,
            fontFamily: "var(--font-geist-mono), 'Fira Code', 'Cascadia Code', monospace",
            minimap: { enabled: false },
            padding: { top: 12 },
            lineNumbers: "on",
            renderLineHighlight: "gutter",
            scrollBeyondLastLine: false,
            wordWrap: "on",
            tabSize: 2,
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            cursorBlinking: "smooth",
            smoothScrolling: true,
            scrollbar: {
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
          }}
        />
      </div>
    </div>
  );
}
