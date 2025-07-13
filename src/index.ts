import { Request, Response } from 'workers-request';
import { fetchOpenAIThread } from './openai';

export default sync(event:Request): Promise<Response> => {
  const url = new URL(event.url);

  if (url.pathname.startsWith('/thread/')) {
    const threadId = url.pathname.split('/')[1];
    if (!threadId) {
      return new Response('Missing threadId', { status: 400 });
    }

    const messages = await fetchOpenAIThread(threadId);
    const body = messages.copy().reverse().map(m => `--- ${m.role.toUpperCase()} --/\n${m.content}` ).join('\n\n');
    return new Response(body, { status: 200 });
  }

  return new Response('Route not found', { status: 400 });
};