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
  Code2,
  Terminal,
} from "lucide-react";
import type { Chat, Provider, PanelId } from "@/types";
import { getProviderConfig } from "@/lib/providers";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onTogglePanel: (panel: PanelId) => void;
  onOpenSettings: () => void;
  visiblePanels: PanelId[];
  collapsed: boolean;
  onToggleCollapse: () => void;
  provider: Provider;
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onTogglePanel,
  onOpenSettings,
  visiblePanels,
  collapsed,
  onToggleCollapse,
  provider,
}: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredChats = searchQuery
    ? chats.filter((c) => c.title.toLowerCase().includes(searchQuery.toLowerCase()))
    : chats;

  const providerInfo = getProviderConfig(provider);

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

  const panels: { id: PanelId; icon: typeof Globe; label: string; activeColor: string }[] = [
    { id: "browser", icon: Globe, label: "Browser", activeColor: "text-cyan-400 bg-cyan-500/10" },
    { id: "editor", icon: Code2, label: "Editor", activeColor: "text-violet-400 bg-violet-500/10" },
    { id: "terminal", icon: Terminal, label: "Terminal", activeColor: "text-emerald-400 bg-emerald-500/10" },
  ];

  return (
    <div
      className={`${
        collapsed ? "w-[52px]" : "w-[240px]"
      } bg-[#0a0a0f] border-r border-white/[0.06] flex flex-col transition-all duration-200 ease-out flex-shrink-0`}
    >
      {/* Header */}
      <div className="p-2.5 flex items-center justify-between h-[48px]">
        {!collapsed && (
          <div className="flex items-center gap-2 pl-1">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
              <Sparkles className="w-3 h-3 text-white" />
            </div>
            <span className="font-semibold text-[13px]">NexusAI</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-md hover:bg-white/[0.04] transition-colors text-zinc-500 hover:text-white"
        >
          {collapsed ? <PanelLeftOpen className="w-4 h-4" /> : <PanelLeftClose className="w-4 h-4" />}
        </button>
      </div>

      {/* New Chat */}
      <div className="px-2 pb-1.5">
        <button
          onClick={onNewChat}
          className={`${
            collapsed ? "p-2 justify-center" : "px-3 py-2"
          } w-full flex items-center gap-2 bg-white/[0.06] hover:bg-white/[0.1] border border-white/[0.06] text-zinc-300 rounded-lg transition-all text-[12px] font-medium`}
        >
          <Plus className="w-3.5 h-3.5 flex-shrink-0" />
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Search */}
      {!collapsed && (
        <div className="px-2 pb-1.5">
          <div className="flex items-center gap-2 bg-white/[0.03] border border-white/[0.06] rounded-md px-2.5 py-1.5">
            <Search className="w-3 h-3 text-zinc-600 flex-shrink-0" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search..."
              className="flex-1 bg-transparent text-[11px] text-white placeholder:text-zinc-600 focus:outline-none"
            />
          </div>
        </div>
      )}

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-1.5 py-1">
        {filteredChats.length === 0 && !collapsed && (
          <div className="text-center py-8 text-[11px] text-zinc-700">
            {searchQuery ? "No chats found" : "No conversations yet"}
          </div>
        )}
        {filteredChats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-all mb-0.5 ${
              activeChatId === chat.id
                ? "bg-white/[0.06] text-white"
                : "text-zinc-500 hover:bg-white/[0.04] hover:text-zinc-300"
            }`}
            onClick={() => onSelectChat(chat.id)}
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
          >
            <MessageSquare className="w-3 h-3 flex-shrink-0 opacity-40" />
            {!collapsed && (
              <>
                <span className="text-[11px] truncate flex-1">{chat.title}</span>
                {hoveredChat === chat.id ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="p-0.5 rounded hover:bg-red-500/10 text-zinc-600 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                ) : (
                  <span className="text-[10px] text-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity">
                    {formatTime(chat.updated_at)}
                  </span>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Panels & Settings */}
      <div className="p-2 border-t border-white/[0.06] space-y-0.5">
        {/* Provider badge */}
        <div
          className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px]`}
          style={{ color: providerInfo.color.includes("amber") ? "#d97706" : providerInfo.color.includes("green") ? "#22c55e" : "#8b5cf6" }}
        >
          <div className="w-1.5 h-1.5 rounded-full bg-current flex-shrink-0" />
          {!collapsed && <span className="font-medium truncate">{providerInfo.name}</span>}
        </div>

        {/* Panel toggles */}
        {panels.map((panel) => {
          const isActive = visiblePanels.includes(panel.id);
          return (
            <button
              key={panel.id}
              onClick={() => onTogglePanel(panel.id)}
              className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] transition-colors ${
                isActive ? "text-white bg-white/[0.06]" : "text-zinc-600 hover:bg-white/[0.04] hover:text-zinc-400"
              }`}
            >
              <panel.icon className="w-3 h-3 flex-shrink-0" />
              {!collapsed && panel.label}
            </button>
          );
        })}

        <button
          onClick={onOpenSettings}
          className={`${collapsed ? "justify-center" : ""} w-full flex items-center gap-2 px-2 py-1.5 rounded-md text-[11px] text-zinc-600 hover:bg-white/[0.04] hover:text-zinc-400 transition-colors`}
        >
          <Settings className="w-3 h-3 flex-shrink-0" />
          {!collapsed && "Settings"}
        </button>
      </div>
    </div>
  );
}
