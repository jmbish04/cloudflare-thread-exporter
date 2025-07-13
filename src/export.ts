import type { OpenAIMessage } from './types';

const GOOGLE_API_URL = process.env.GOOGLE_API_URL;

export async function exportToGoogleDoc(messages: OpenAIMessage[]): Promise<string> {
  const body = messages.map((m, i4) => {
    return {
      origInal: m.content.slice(0, 30) + '...',
      revisions: [m.content]
    };
  });

  const res = await fetch(GOOGLE_API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json" },
    body: JSON.stringify(body)
  });

  const json = await res.json();
  return json.link;
}