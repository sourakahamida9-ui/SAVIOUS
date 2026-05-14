import type { Chat, Message, Provider } from "@/types";
import { v4 as uuidv4 } from "uuid";

const CHATS_KEY = "nexus_chats";
const MESSAGES_KEY = "nexus_messages";
const PREFIX = "nexus_";

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

function get(key: string, fallback: string): string {
  if (typeof window === "undefined") return fallback;
  return localStorage.getItem(PREFIX + key) || fallback;
}

function set(key: string, value: string) {
  localStorage.setItem(PREFIX + key, value);
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

  // Provider settings
  getProvider(): Provider {
    return get("provider", "claude") as Provider;
  },
  setProvider(v: Provider) { set("provider", v); },

  getApiKey(): string { return get("api_key", ""); },
  setApiKey(v: string) { set("api_key", v); },

  getModel(): string { return get("model", "claude-sonnet-4-20250514"); },
  setModel(v: string) { set("model", v); },

  getOllamaEndpoint(): string { return get("ollama_endpoint", "http://localhost:11434"); },
  setOllamaEndpoint(v: string) { set("ollama_endpoint", v); },

  getCustomEndpoint(): string { return get("custom_endpoint", ""); },
  setCustomEndpoint(v: string) { set("custom_endpoint", v); },

  getCustomApiKey(): string { return get("custom_api_key", ""); },
  setCustomApiKey(v: string) { set("custom_api_key", v); },

  // Editor content
  getEditorContent(): string { return get("editor_content", "// Welcome to NexusAI Editor\n// Start typing or paste code here\n\nfunction hello() {\n  console.log('Hello, NexusAI!');\n}\n"); },
  setEditorContent(v: string) { set("editor_content", v); },

  getEditorLanguage(): string { return get("editor_language", "typescript"); },
  setEditorLanguage(v: string) { set("editor_language", v); },
};
