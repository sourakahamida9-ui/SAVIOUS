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

export type Provider = "claude" | "ollama" | "openai-compatible";

export interface ProviderConfig {
  id: Provider;
  name: string;
  description: string;
  requiresApiKey: boolean;
  defaultEndpoint?: string;
  models: ModelOption[];
  color: string;
  badge: string;
}

export interface ModelOption {
  id: string;
  name: string;
  desc: string;
  provider: Provider;
}

export interface UserSettings {
  api_key: string;
  model: string;
  provider: Provider;
  ollama_endpoint: string;
  openai_endpoint: string;
  openai_api_key: string;
}
