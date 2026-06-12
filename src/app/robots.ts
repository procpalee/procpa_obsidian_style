import type { MetadataRoute } from 'next'

// AI search / answer-engine crawlers we explicitly welcome so the content is
// citable in LLM-based search (ChatGPT, Claude, Perplexity, Google AI, etc.).
const AI_CRAWLERS = [
  'GPTBot',
  'OAI-SearchBot',
  'ChatGPT-User',
  'ClaudeBot',
  'Claude-Web',
  'anthropic-ai',
  'PerplexityBot',
  'Perplexity-User',
  'Google-Extended',
  'CCBot',
  'cohere-ai',
  'Applebot-Extended',
]

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      { userAgent: AI_CRAWLERS, allow: '/' },
    ],
    sitemap: 'https://procpa.co.kr/sitemap.xml',
    host: 'https://procpa.co.kr',
  }
}
