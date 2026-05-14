import type { Chat, Message } from "@/types";
import { v4 as uuidv4 } from "uuid";

const CHATS_KEY = "nexus_chats";
const MESSAGES_KEY = "nexus_messages";

function getChats(): Chat[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(CHATS_KEY);
  return data ? JSON.parse(data) : [];
}

function saveChats(chats: Chat[]) {
  localStorage.setItem(CHATS_KEY, JSON.stringify(chats));
}

function getMessages(): (Message & { chat_id: string })[] {
  if (typeof window === "undefined") return [];
  const data = localStorage.getItem(MESSAGES_KEY);
  return data ? JSON.parse(data) : [];
}

function saveMessages(messages: (Message & { chat_id: string })[]) {
  localStorage.setItem(MESSAGES_KEY, JSON.stringify(messages));
}

export const storage = {
  loadChats(): Chat[] {
    return getChats().sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    );
  },

  createChat(title: string): Chat {
    const chat: Chat = {
      id: uuidv4(),
      title,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      user_id: "local",
    };
    const chats = getChats();
    chats.push(chat);
    saveChats(chats);
    return chat;
  },

  updateChat(id: string, updates: Partial<Chat>) {
    const chats = getChats();
    const index = chats.findIndex((c) => c.id === id);
    if (index !== -1) {
      chats[index] = { ...chats[index], ...updates };
      saveChats(chats);
    }
  },

  deleteChat(id: string) {
    const chats = getChats().filter((c) => c.id !== id);
    saveChats(chats);
    const messages = getMessages().filter((m) => m.chat_id !== id);
    saveMessages(messages);
  },

  loadMessages(chatId: string): Message[] {
    return getMessages()
      .filter((m) => m.chat_id === chatId)
      .sort(
        (a, b) =>
          new Date(a.created_at || "").getTime() -
          new Date(b.created_at || "").getTime()
      );
  },

  addMessage(chatId: string, role: "user" | "assistant", content: string) {
    const messages = getMessages();
    messages.push({
      id: uuidv4(),
      chat_id: chatId,
      role,
      content,
      created_at: new Date().toISOString(),
    });
    saveMessages(messages);
  },

  getApiKey(): string {
    if (typeof window === "undefined") return "";
    return localStorage.getItem("nexus_api_key") || "";
  },

  setApiKey(key: string) {
    localStorage.setItem("nexus_api_key", key);
  },

  getModel(): string {
    if (typeof window === "undefined") return "claude-sonnet-4-20250514";
    return (
      localStorage.getItem("nexus_model") || "claude-sonnet-4-20250514"
    );
  },

  setModel(model: string) {
    localStorage.setItem("nexus_model", model);
  },
};
