import { createAnthropic } from "@ai-sdk/anthropic";
import { streamText } from "ai";

export const maxDuration = 60;

export async function POST(req: Request) {
  const { messages, apiKey, model } = await req.json();

  if (!apiKey) {
    return new Response(JSON.stringify({ error: "API key is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const anthropic = createAnthropic({
    apiKey: apiKey,
  });

  const result = streamText({
    model: anthropic(model || "claude-sonnet-4-20250514"),
    messages,
    system:
      "You are a helpful, intelligent AI assistant powered by Claude. You can help with coding, writing, analysis, math, and creative tasks. Be concise but thorough. Use markdown formatting for code blocks and structured responses.",
  });

  return result.toUIMessageStreamResponse();
}
