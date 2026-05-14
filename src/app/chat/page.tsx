"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import Sidebar from "@/components/Sidebar";
import ChatArea from "@/components/ChatArea";
import EmbeddedBrowser from "@/components/EmbeddedBrowser";
import SettingsModal from "@/components/SettingsModal";
import { storage } from "@/lib/storage";
import type { Chat, Provider } from "@/types";

export default function ChatPage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showBrowser, setShowBrowser] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [model, setModel] = useState("claude-sonnet-4-20250514");
  const [provider, setProvider] = useState<Provider>("claude");
  const [ollamaEndpoint, setOllamaEndpoint] = useState("http://localhost:11434");
  const [openaiEndpoint, setOpenaiEndpoint] = useState("");
  const [openaiApiKey, setOpenaiApiKey] = useState("");
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
          openaiEndpoint,
          openaiApiKey,
        },
      }),
    [apiKey, model, provider, ollamaEndpoint, openaiEndpoint, openaiApiKey]
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
    setOpenaiEndpoint(storage.getOpenAIEndpoint());
    setOpenaiApiKey(storage.getOpenAIApiKey());
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const isConfigured =
      provider === "claude" ? !!apiKey :
      provider === "ollama" ? !!ollamaEndpoint :
      !!openaiEndpoint;

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
    openaiEndpoint: string;
    openaiApiKey: string;
  }) => {
    setApiKey(settings.apiKey);
    setModel(settings.model);
    setProvider(settings.provider);
    setOllamaEndpoint(settings.ollamaEndpoint);
    setOpenaiEndpoint(settings.openaiEndpoint);
    setOpenaiApiKey(settings.openaiApiKey);
    storage.setApiKey(settings.apiKey);
    storage.setModel(settings.model);
    storage.setProvider(settings.provider);
    storage.setOllamaEndpoint(settings.ollamaEndpoint);
    storage.setOpenAIEndpoint(settings.openaiEndpoint);
    storage.setOpenAIApiKey(settings.openaiApiKey);
  };

  if (!mounted) {
    return (
      <div className="h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          <span className="text-sm text-muted-foreground">Loading...</span>
        </div>
      </div>
    );
  }

  const isConfigured =
    provider === "claude" ? !!apiKey :
    provider === "ollama" ? !!ollamaEndpoint :
    !!openaiEndpoint;

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

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={handleNewChat}
        onSelectChat={handleSelectChat}
        onDeleteChat={handleDeleteChat}
        onToggleBrowser={() => setShowBrowser(!showBrowser)}
        onOpenSettings={() => setShowSettings(true)}
        showBrowser={showBrowser}
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        provider={provider}
      />

      <div className="flex-1 flex min-w-0">
        <div
          className={`flex-1 flex flex-col min-w-0 ${showBrowser ? "w-1/2" : ""}`}
        >
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

        {showBrowser && (
          <div className="w-1/2 min-w-[400px]">
            <EmbeddedBrowser onClose={() => setShowBrowser(false)} />
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
        openaiEndpoint={openaiEndpoint}
        openaiApiKey={openaiApiKey}
        onSave={handleSaveSettings}
      />
    </div>
  );
}
