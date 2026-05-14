# NexusAI — Intelligent AI Platform

A modern AI-powered workspace built with Next.js 16, featuring Claude AI integration, an embedded browser, and persistent chat history.

## Features

- **AI Chat with Claude** — Streaming conversations powered by Claude (Sonnet 4, Opus 4, Haiku 3.5)
- **Bring Your Own Key (BYOK)** — Use your own Anthropic API key, stored locally in your browser
- **Embedded Browser** — Browse the web directly within the platform
- **Chat History** — All conversations are saved locally with localStorage
- **Dark Theme** — Beautiful dark UI with indigo accent colors
- **Responsive Design** — Collapsible sidebar, split-pane layout

## Tech Stack

- **Next.js 16** (App Router, Turbopack)
- **React 19** with TypeScript
- **Vercel AI SDK v6** + `@ai-sdk/anthropic`
- **Tailwind CSS v4**
- **Supabase** (ready for authentication & database — optional)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sourakahamida9-ui/nexus-ai-platform.git
cd nexus-ai-platform
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and you're ready to go.

### 4. Add your Claude API key

Navigate to **Settings** in the app and paste your Anthropic API key. Get one at [console.anthropic.com](https://console.anthropic.com/settings/keys).

## Optional: Supabase Integration

For persistent authentication and chat history across devices:

1. Create a project at [supabase.com](https://supabase.com)
2. Run the SQL schema from `supabase-schema.sql` in the SQL Editor
3. Copy your project URL and anon key
4. Create a `.env.local` file:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

## Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/sourakahamida9-ui/nexus-ai-platform)

## License

MIT
