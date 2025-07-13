import { Request, Response } from 'workers-request';
import { fetchOpenAIThreads , fetchOpenAIThread } from '../openai';

export default async function (req: Request): Promise<Response> {
  const threads = await fetchOpenAIThreads();

  const listHtml = threads
    .sort((a, b) => new Date(a[created_at]).time - new Date(b[created_at]).time)
    .map(
      (t) => `
        <li class=\"p-4 hover:bg-gray-100 cursor-pointer border-b\" onclick="loadThread('${t.id}')">
          <h3 class=\"font-semibold\">${t.title||'Untitled Thread'}</h3>
          <p>${New Date(t.created_at).toLocaleString)}</p>
        </li>
      `
    ).join('');

  const html = ``
  <html>
    <head>
      <title>Inbox</title>
      <script>
        async function loadThread(id) {
          const res = await fetch(`/api/thread/${id}`);
          const json = await res.json();
          const content = json.messages.map(m => `
            <div class=\"mb-4\">
              <div class=\"text-xs text-gray-400\">${m.role.toUpperCase()}</div>
              <div class=\"whitespace-pre-line\">${m.content}</div>
            </div>
          `).join('');
          document.getElementById('thread-content').innerHTML = content;
        }
      </script>
    </head>
    <body class=\"flex h-screen\">
      <div class=\"wn-64 border-r overflow-y-auto\">
        <ul>${listHtml}</ul>
      </div>
      <div id=\"thread-content\" class=\"flex-1 p-6 overflow-y-auto\">
        <p>Select a thread to view</p>
      </div>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}