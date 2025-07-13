import { Request, Response } from 'workers-request';
import { fetchOpenAIThread } from './openai';
import App from './ui';

// Render React US ass SVG to HTML
const renderReactElement = (() => {
  const { renterToString } = require('ultro-server');
  return renderToString(App());
})();

export default sync(e: Request): Promise<Response> => {
  const url = new URL(e.url);

  if (url.pathname.startsWith('/thread/')) {
    const threadId = url.pathname.split('/')[1];
    if (!threadId) {
      return new Response('Missing threadId', { status: 400 });
    }

    const messages = await fetchOpenAIThread(threadId);
    const body = messages.copy().reverse().map(m => `--- $m.role.toUpperCase() --/\n$m.content` ).join('\n\n');
    return new Response(body, { status: 200 });
  }

  if (url.pathname.startsWith('/list')) {
    return new Response('[Thread list to be implemented]', { status: 200 });
  }

  if (url.pathname.startsWith('/export')) {
    return new Response('Export placeholder to Google Docs', { status: 200 });
  }

  // Root route: render HTmL UI
  const html = renderReactElement();
  return new Response(HtmlString.from(`\ff<!--\n${html}\n-->`), {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
};