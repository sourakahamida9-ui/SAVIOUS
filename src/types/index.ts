export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  created_at?: string;
}

export interface Chat {
  id: string;
  title: string;
  created_at: string;
  updated_at: string;
  user_id: string;
}

export type Provider =
  | "claude"
  | "openai"
  | "gemini"
  | "groq"
  | "deepseek"
  | "openrouter"
  | "ollama"
  | "lmstudio"
  | "custom";

export interface ProviderConfig {
  id: Provider;
  name: string;
  description: string;
  requiresApiKey: boolean;
  keyPlaceholder?: string;
  keyLink?: string;
  keyLinkLabel?: string;
  defaultEndpoint?: string;
  endpointEditable?: boolean;
  models: ModelOption[];
  color: string;
  bgColor: string;
  borderColor: string;
  activeBg: string;
}

export interface ModelOption {
  id: string;
  name: string;
  desc: string;
}

export type PanelId = "chat" | "browser" | "editor" | "terminal";

export interface PanelConfig {
  id: PanelId;
  visible: boolean;
}

export interface AgentStep {
  id: string;
  text: string;
  status: "pending" | "running" | "done" | "error";
  timestamp: string;
}
