import { OpenAIIMessage } from './types';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;
const BASE_URL = 'https://api.openai.com/v1/threads';

export async function fetchOpenAIThread(threadId: string): Promise<OpenAIIMessage[]> {
  let url = `${BASE_URL}/${threadId}/messages`;
  const headers = {
    Authorization: `Bearer ${OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
    'OpenAI-Beta': 'assistants=v2',
  };

  const messages: OpenAIIMessage[] = [];
  let next: string | null = null;

  do {
    const paginatedUrl = next ? `${url}?after=${next}` : url;
    const res = await fetch(paginatedUrl, { headers });
    const json = await res.json();

    json.data.reverse().forEach((msg: any) => {
      const content = msg.content.map((c: any) => c.text.value).join('\n\n');
      messages.push({
        role: msg.role,
        content,
      });
    });

    next = json.has_more ? json.last_id : null;
  } while (next);

  return messages.reverse();
}
