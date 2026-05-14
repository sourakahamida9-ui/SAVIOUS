import { createAnthropic } from "@ai-sdk/anthropic";
import { createOpenAICompatible } from "@ai-sdk/openai-compatible";
import { streamText } from "ai";

export const maxDuration = 60;

const SYSTEM_PROMPT =
  "You are a helpful, intelligent AI assistant. You can help with coding, writing, analysis, math, and creative tasks. Be concise but thorough. Use markdown formatting for code blocks and structured responses.";

export async function POST(req: Request) {
  const { messages, apiKey, model, provider, ollamaEndpoint, openaiEndpoint, openaiApiKey } =
    await req.json();

  if (provider === "claude" || !provider) {
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

  if (provider === "openai-compatible") {
    if (!openaiEndpoint) {
      return new Response(
        JSON.stringify({ error: "OpenAI-compatible endpoint is required" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const custom = createOpenAICompatible({
      name: "custom",
      baseURL: openaiEndpoint,
      apiKey: openaiApiKey || undefined,
    });

    const result = streamText({
      model: custom(model || "default"),
      messages,
      system: SYSTEM_PROMPT,
    });
    return result.toUIMessageStreamResponse();
  }

  return new Response(
    JSON.stringify({ error: "Unknown provider" }),
    { status: 400, headers: { "Content-Type": "application/json" } }
  );
}
