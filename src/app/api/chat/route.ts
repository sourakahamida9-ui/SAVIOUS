import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAI } from "@ai-sdk/openai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

export const maxDuration = 60;

const SYSTEM_PROMPT =
  "You are NexusAI, an advanced AI software engineering assistant. You can help with coding, debugging, architecture, writing, analysis, math, and creative tasks. Be concise but thorough. Use markdown formatting for code blocks and structured responses. When writing code, always include proper imports and types.";

export async function POST(req: Request) {
  const {
    messages,
    apiKey,
    model,
    provider,
    ollamaEndpoint,
    customEndpoint,
    customApiKey,
  } = await req.json();

  try {
    // Claude (Anthropic)
    if (provider === "claude") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "Anthropic API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const anthropic = createAnthropic({ apiKey });
      const result = streamText({
        model: anthropic(model || "claude-sonnet-4-20250514"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // OpenAI
    if (provider === "openai") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "OpenAI API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const openai = createOpenAI({ apiKey });
      const result = streamText({
        model: openai(model || "gpt-4o"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // Google Gemini
    if (provider === "gemini") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "Google API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const google = createGoogleGenerativeAI({ apiKey });
      const result = streamText({
        model: google(model || "gemini-2.0-flash"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // Groq
    if (provider === "groq") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "Groq API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const groq = createOpenAICompatible({
        name: "groq",
        baseURL: "https://api.groq.com/openai/v1",
        apiKey,
      });
      const result = streamText({
        model: groq(model || "llama-3.3-70b-versatile"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // DeepSeek
    if (provider === "deepseek") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "DeepSeek API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const deepseek = createOpenAICompatible({
        name: "deepseek",
        baseURL: "https://api.deepseek.com/v1",
        apiKey,
      });
      const result = streamText({
        model: deepseek(model || "deepseek-chat"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // OpenRouter
    if (provider === "openrouter") {
      if (!apiKey) {
        return new Response(
          JSON.stringify({ error: "OpenRouter API key is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const openrouter = createOpenAICompatible({
        name: "openrouter",
        baseURL: "https://openrouter.ai/api/v1",
        apiKey,
      });
      const result = streamText({
        model: openrouter(model || "anthropic/claude-sonnet-4-20250514"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // Ollama (local)
    if (provider === "ollama") {
      const endpoint = ollamaEndpoint || "http://localhost:11434";
      const ollama = createOpenAICompatible({
        name: "ollama",
        baseURL: `${endpoint}/v1`,
      });
      const result = streamText({
        model: ollama(model || "llama3.2"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // LM Studio (local)
    if (provider === "lmstudio") {
      const endpoint = customEndpoint || "http://localhost:1234";
      const lmstudio = createOpenAICompatible({
        name: "lmstudio",
        baseURL: `${endpoint}/v1`,
      });
      const result = streamText({
        model: lmstudio(model || "default"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    // Custom / OpenAI-compatible
    if (provider === "custom") {
      if (!customEndpoint) {
        return new Response(
          JSON.stringify({ error: "Custom endpoint is required" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const custom = createOpenAICompatible({
        name: "custom",
        baseURL: customEndpoint,
        apiKey: customApiKey || undefined,
      });
      const result = streamText({
        model: custom(model || "default"),
        messages,
        system: SYSTEM_PROMPT,
      });
      return result.toUIMessageStreamResponse();
    }

    return new Response(
      JSON.stringify({ error: `Unknown provider: ${provider}` }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
