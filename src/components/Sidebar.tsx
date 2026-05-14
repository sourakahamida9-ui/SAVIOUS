"use client";

import { useState } from "react";
import {
  MessageSquare,
  Plus,
  Settings,
  Globe,
  Trash2,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Sparkles,
} from "lucide-react";
import type { Chat } from "@/types";

interface SidebarProps {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  onToggleBrowser: () => void;
  onOpenSettings: () => void;
  onSignOut: () => void;
  showBrowser: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  onToggleBrowser,
  onOpenSettings,
  onSignOut,
  showBrowser,
  collapsed,
  onToggleCollapse,
}: SidebarProps) {
  const [hoveredChat, setHoveredChat] = useState<string | null>(null);

  return (
    <div
      className={`${
        collapsed ? "w-16" : "w-64"
      } bg-sidebar border-r border-border flex flex-col transition-all duration-300 ease-in-out`}
    >
      {/* Header */}
      <div className="p-3 border-b border-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <span className="font-semibold text-sm gradient-text">NexusAI</span>
          </div>
        )}
        <button
          onClick={onToggleCollapse}
          className="p-1.5 rounded-lg hover:bg-sidebar-hover transition-colors text-muted-foreground hover:text-foreground"
          title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <PanelLeftOpen className="w-4 h-4" />
          ) : (
            <PanelLeftClose className="w-4 h-4" />
          )}
        </button>
      </div>

      {/* New Chat Button */}
      <div className="p-3">
        <button
          onClick={onNewChat}
          className={`${
            collapsed ? "p-2 justify-center" : "px-3 py-2"
          } w-full flex items-center gap-2 bg-primary hover:bg-primary-hover text-primary-foreground rounded-lg transition-colors text-sm font-medium`}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "New Chat"}
        </button>
      </div>

      {/* Chat List */}
      <div className="flex-1 overflow-y-auto px-2">
        {chats.map((chat) => (
          <div
            key={chat.id}
            className={`group flex items-center gap-2 px-2 py-2 rounded-lg cursor-pointer transition-colors mb-0.5 ${
              activeChatId === chat.id
                ? "bg-accent text-accent-foreground"
                : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
            }`}
            onClick={() => onSelectChat(chat.id)}
            onMouseEnter={() => setHoveredChat(chat.id)}
            onMouseLeave={() => setHoveredChat(null)}
          >
            <MessageSquare className="w-4 h-4 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="text-sm truncate flex-1">{chat.title}</span>
                {hoveredChat === chat.id && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDeleteChat(chat.id);
                    }}
                    className="p-1 rounded hover:bg-destructive/20 text-muted hover:text-destructive transition-colors"
                  >
                    <Trash2 className="w-3 h-3" />
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>

      {/* Bottom Actions */}
      <div className="p-2 border-t border-border space-y-1">
        <button
          onClick={onToggleBrowser}
          className={`${
            collapsed ? "justify-center" : ""
          } w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm transition-colors ${
            showBrowser
              ? "bg-primary/10 text-primary"
              : "text-muted-foreground hover:bg-sidebar-hover hover:text-foreground"
          }`}
          title="Toggle Browser"
        >
          <Globe className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Browser"}
        </button>
        <button
          onClick={onOpenSettings}
          className={`${
            collapsed ? "justify-center" : ""
          } w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-hover hover:text-foreground transition-colors`}
          title="Settings"
        >
          <Settings className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Settings"}
        </button>
        <button
          onClick={onSignOut}
          className={`${
            collapsed ? "justify-center" : ""
          } w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-muted-foreground hover:bg-sidebar-hover hover:text-destructive transition-colors`}
          title="Sign Out"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          {!collapsed && "Sign Out"}
        </button>
      </div>
    </div>
  );
}
