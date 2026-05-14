"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Settings,
  Globe,
  Trash2,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
  Search,
  Server,
  Brain,
  Blocks,
} from "lucide-react";
import type { Chat, Provider } from "@/types";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onToggleBrowser: () => void;
  onOpenSettings: () => void;
  showBrowser: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
  provider: Provider;
}

const PROVIDER_CONFIG = {
  claude: { icon: Brain, color: "text-amber-400", bg: "bg-amber-500/10", label: "Claude" },
  ollama: { icon: Server, color: "text-emerald-400", bg: "bg-emerald-500/10", label: "Ollama" },
  "openai-compatible": { icon: Blocks, color: "text-blue-400", bg: "bg-blue-500/10", label: "Custom" },
};

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onToggleBrowser,
  onOpenSettings,
  showBrowser,
  collapsed,
  onToggleCollapse,
  provider,
}: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = searchQuery
    ? chats.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : chats;

  const providerInfo = PROVIDER_CONFIG[provider];
  const ProviderIcon = providerInfo.icon;

  const formatTime = (dateStr: string) => {
    const date = new Date(dateStr);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMin = Math.floor(diffMs / 60000);
    if (diffMin < 1) return "now";
    if (diffMin < 60) return `${diffMin}m`;
    const diffHr = Math.floor(diffMin / 60);
    if (diffHr < 24) return `${diffHr}h`;
    const diffDay = Math.floor(diffHr / 24);
    return `${diffDay}d`;
  };

  return (
    <div
      className={`${
        collapsed ? "w-[52px]" : "w-[260px]"
      } bg-sidebar border-r border-border flex flex-col transition-all duration-200 ease-out`}
    >
      {/* Header */}
      <div className="p-2.5 flex items-center justify-between h-[52px]">
        {!collapsed && (
          <div className="flex items-center gap-2.5 pl-1">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-white" />
            </div>
            <span className="font-semibold text-sm">NexusAI</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-sidebar-hover transition-colors text-muted-foreground hover:text-foreground"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat */}
      <div className="px-2.5 pb-2">
        <button
          onClick={onNewChat}
          className={`${
            collapsed ? "p-2 justify-center" : "px-3 py-2.5"
          } w-full flex items-center gap-2 bg-gradient-to-r from-violet-600/20 to-purple-600/20 hover:from-violet-600/30 hover:to-purple-600/30 border border-violet-500/10 hover:border-violet-500/20 text-violet-300 rounded-xl transition-all text-sm font-medium`}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-2.5 pb-2">
          <div className="flex items-center gap-2 bg-surface border border-border rounded-lg px-2.5 py-1.5">
            <Search className="w-3.5 h-3.5 text-muted flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search chats..."
              className="flex-1 bg-transparent text-xs text-foreground placeholder:text-muted focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-1.5 py-1">
        {filteredChats.length === 0 && !collapsed && (
          <div className="text-center py-8 text-xs text-muted">
            {searchQuery ? "No chats found" : "No conversations yet"}
          </div>
        )}
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-all mb-0.5 ${
              activeChatId === chat.id
                ? "bg-accent text-foreground"
                : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
            }`}
            onClick={() => onSelectChat(chat.id)}
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
          >
            <MessageSquare className="w-3.5 h-3.5 flex-shrink-0 opacity-50" />
            {!collapsed && (
              <>
                <span className="text-xs truncate flex-1">{chat.title}</span>
                {hoveredChat === chat.id ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="p-0.5 rounded hover:bg-destructive/20 text-muted hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[10px] text-muted opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(chat.updated_at)}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom */}
      <div className="p-2 border-t border-border space-y-0.5">
        {/* Provider badge */}
        <div
          className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs ${providerInfo.bg} ${providerInfo.color}`}
        >
          <ProviderIcon className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && <span className="font-medium">{providerInfo.label} Active</span>}
        </div>
        <button
          onClick={onToggleBrowser}
          className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs transition-colors ${
            showBrowser ? "bg-cyan-500/10 text-cyan-400" : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
          }`}
        >
          <Globe className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && "Browser"}
        </button>
        <button
          onClick={onOpenSettings}
          className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-lg text-xs text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors`}
        >
          <Settings className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && "Settings"}
        </button>
      </div>
    </div>
  );
}
