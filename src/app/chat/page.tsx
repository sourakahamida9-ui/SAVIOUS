"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import dynamic from "next/dynamic";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import EmbeddedBrowser from "@/components/EmbeddedBrowser";
import SettingsModal from "@/components/SettingsModal";
import { storage } from "@/lib/storage";
import { getProviderConfig } from "@/lib/providers";
import type { Chat, Provider, PanelId } from "@/types";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });
const TerminalPanel = dynamic(() => import("@/components/TerminalPanel"), { ssr: false });

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [visiblePanels, setVisiblePanels] = useState<PanelId[]>(["chat"]);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("claude-sonnet-4-20250514");
  const [provider, setProvider] = useState<Provider>("claude");
  const [ollamaEndpoint, setOllamaEndpoint] = useState("http://localhost:11434");
  const [customEndpoint, setCustomEndpoint] = useState("");
  const [customApiKey, setCustomApiKey] = useState("");
  const [mounted, setMounted] = useState(false);
  const [input, setInput] = useState("");

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: {
          apiKey,
          model,
          provider,
          ollamaEndpoint,
          customEndpoint,
          customApiKey,
        },
      }),
    [apiKey, model, provider, ollamaEndpoint, customEndpoint, customApiKey]
  );

  const {
    messages,
    sendMessage,
    status,
    setMessages,
  } = useChat({
    id: activeChatId || undefined,
    transport,
    onFinish: ({ message }) => {
      if (activeChatId) {
        const textContent =
          message.parts
            ?.filter(
              (p): p is { type: "text"; text: string } => p.type === "text"
            )
            .map((p) => p.text)
            .join("") || "";
        storage.addMessage(activeChatId, "assistant", textContent);

        const allMessages = storage.loadMessages(activeChatId);
        if (allMessages.length <= 2) {
          const firstUserMsg = allMessages.find((m) => m.role === "user");
          if (firstUserMsg) {
            const title =
              firstUserMsg.content.slice(0, 50) +
              (firstUserMsg.content.length > 50 ? "..." : "");
            storage.updateChat(activeChatId, {
              title,
              updated_at: new Date().toISOString(),
            });
          }
        } else {
          storage.updateChat(activeChatId, {
            updated_at: new Date().toISOString(),
          });
        }
        setChats(storage.loadChats());
      }
    },
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    setMounted(true);
    setApiKey(storage.getApiKey());
    setModel(storage.getModel());
    setProvider(storage.getProvider());
    setOllamaEndpoint(storage.getOllamaEndpoint());
    setCustomEndpoint(storage.getCustomEndpoint());
    setCustomApiKey(storage.getCustomApiKey());
    setChats(storage.loadChats());
  }, []);

  const handleNewChat = useCallback(() => {
    const newChat = storage.createChat("New Chat");
    setChats(storage.loadChats());
    setActiveChatId(newChat.id);
    setMessages([]);
    setInput("");
  }, [setMessages]);

  const handleSelectChat = useCallback(
    (chatId: string) => {
      setActiveChatId(chatId);
      const msgs = storage.loadMessages(chatId);
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          role: m.role as "user" | "assistant",
          parts: [{ type: "text" as const, text: m.content }],
        }))
      );
      setInput("");
    },
    [setMessages]
  );

  const handleDeleteChat = useCallback(
    (chatId: string) => {
      storage.deleteChat(chatId);
      setChats(storage.loadChats());
      if (activeChatId === chatId) {
        setActiveChatId(null);
        setMessages([]);
      }
    },
    [activeChatId, setMessages]
  );

  const handleTogglePanel = useCallback((panelId: PanelId) => {
    setVisiblePanels((prev) => {
      if (prev.includes(panelId)) {
        const next = prev.filter((p) => p !== panelId);
        return next.length === 0 ? ["chat"] : next;
      }
      return [...prev, panelId];
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const config = getProviderConfig(provider);
    const isConfigured =
      config.requiresApiKey ? !!apiKey :
      (provider === "ollama" || provider === "lmstudio" || provider === "custom") ? !!(provider === "ollama" ? ollamaEndpoint : customEndpoint) :
      true;

    if (!isConfigured) return;

    let chatId = activeChatId;
    if (!chatId) {
      const title = input.slice(0, 50) + (input.length > 50 ? "..." : "");
      const newChat = storage.createChat(title);
      setChats(storage.loadChats());
      setActiveChatId(newChat.id);
      chatId = newChat.id;
    }

    storage.addMessage(chatId, "user", input);
    const currentInput = input;
    setInput("");
    await sendMessage({ text: currentInput });
  };

  const handleSaveSettings = (settings: {
    apiKey: string;
    model: string;
    provider: Provider;
    ollamaEndpoint: string;
    customEndpoint: string;
    customApiKey: string;
  }) => {
    setApiKey(settings.apiKey);
    setModel(settings.model);
    setProvider(settings.provider);
    setOllamaEndpoint(settings.ollamaEndpoint);
    setCustomEndpoint(settings.customEndpoint);
    setCustomApiKey(settings.customApiKey);
    storage.setApiKey(settings.apiKey);
    storage.setModel(settings.model);
    storage.setProvider(settings.provider);
    storage.setOllamaEndpoint(settings.ollamaEndpoint);
    storage.setCustomEndpoint(settings.customEndpoint);
    storage.setCustomApiKey(settings.customApiKey);
  };

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading NexusAI...</span>
        </div>
      </div>
    );
  }

  const config = getProviderConfig(provider);
  const isConfigured =
    config.requiresApiKey ? !!apiKey :
    (provider === "ollama" || provider === "lmstudio" || provider === "custom") ? !!(provider === "ollama" ? ollamaEndpoint : customEndpoint) :
    true;

  const displayMessages = messages.map((m) => ({
    id: m.id,
    role: m.role as "user" | "assistant",
    content:
      m.parts
        ?.filter(
          (p): p is { type: "text"; text: string } => p.type === "text"
        )
        .map((p) => p.text)
        .join("") || "",
  }));

  const showBrowser = visiblePanels.includes("browser");
  const showEditor = visiblePanels.includes("editor");
  const showTerminal = visiblePanels.includes("terminal");
  const rightPanelCount = (showBrowser ? 1 : 0) + (showEditor ? 1 : 0);
  const hasRightPanel = rightPanelCount > 0;

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onTogglePanel={handleTogglePanel}
        onOpenSettings={() => setShowSettings(true)}
        visiblePanels={visiblePanels}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        provider={provider}
      />

      {/* Main content area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top row: Chat + Right panels */}
        <div className={`flex-1 flex min-h-0 ${showTerminal ? "h-[60%]" : "h-full"}`}>
          {/* Chat panel — always visible */}
          <div className={`flex flex-col min-w-0 ${hasRightPanel ? "w-1/2 border-r border-border" : "flex-1"}`}>
            <ChatArea
              messages={displayMessages}
              input={input}
              onInputChange={setInput}
              onSubmit={handleSubmit}
              isLoading={isLoading}
              hasApiKey={isConfigured}
              onOpenSettings={() => setShowSettings(true)}
              provider={provider}
              model={model}
            />
          </div>

          {/* Right panels */}
          {hasRightPanel && (
            <div className={`flex flex-col min-w-0 ${hasRightPanel ? "w-1/2" : ""}`}>
              {showBrowser && showEditor ? (
                <>
                  <div className="h-1/2 border-b border-border">
                    <EmbeddedBrowser onClose={() => handleTogglePanel("browser")} />
                  </div>
                  <div className="h-1/2">
                    <CodeEditor onClose={() => handleTogglePanel("editor")} />
                  </div>
                </>
              ) : showBrowser ? (
                <EmbeddedBrowser onClose={() => handleTogglePanel("browser")} />
              ) : showEditor ? (
                <CodeEditor onClose={() => handleTogglePanel("editor")} />
              ) : null}
            </div>
          )}
        </div>

        {/* Bottom: Terminal */}
        {showTerminal && (
          <div className="h-[40%] min-h-[150px]">
            <TerminalPanel onClose={() => handleTogglePanel("terminal")} />
          </div>
        )}
      </div>

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
        apiKey={apiKey}
        model={model}
        provider={provider}
        ollamaEndpoint={ollamaEndpoint}
        customEndpoint={customEndpoint}
        customApiKey={customApiKey}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
