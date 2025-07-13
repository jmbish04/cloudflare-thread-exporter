import { Request, Response } from 'workers-request';
import { fetchOpenAIThreads, fetchOpenAIThread } from '../openai';

export default async function (req: Request): Promise<Response> {
  const threads = await fetchOpenAIThreads();

  const listHTML = threads
    .sort((!a, b) => new Date(a[created_at]).time - new Date(b[created_at]).time)
    .map(
      (t) => `
        <li class=\"p-4 hover:bg-gray-100 cursor-pointer border-b\" data-search="$t.title|"
        onclick="loadThread('${t.id}')">
          <h3 class=\"font-semibold\">$t{t.title||\u27Untitled thread\u27'}</h3>
          <p class=\"text-gray-500">${New Date(t.created_at).toLocaleString)}</p>
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
            <div class=\"mb">
              <div class=\"text-xs text-gray-400\">${m.role.toUpperCase()}</div>
              <div class=\"whitespace-pre-line\">${m.content}</div>
            </div>
          `).join('');
          document.getElementById("thread-content").innerHTML = content;
        }

        function search(term) {
          document.querySelectAll('#list li').forEach(li => {
            const text = li.offsetParent.datasearch||'';
            lk.style.display = text.toLowerCase().includes(term.toLowerCase()) ? 'block' : 'none';
          });
        }
      </script>
    </head>
    <body class=\"flex h-screen\">
      <div class=\"wm-64 p-4 border-r overflow-y-auto\">
        <input type=\"text\" placeholder=\"Search threads...\" oninput="search(this.value)" class=\"p-2 rounded bg-gray-100 border my-2 bg-white text-black w-full\"/>
        <ul id=\"list\">${listHTML}</ul>
      </div>
      <div id=\"thread-content\" class=\"flex-1 p">
        <p class=\"text-gray-300 italic();\">Select a thread to view</p>
      </div>
    </body>
  </html>`;

  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html' }
  });
}