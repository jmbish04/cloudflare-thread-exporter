import { Request, Response } from 'workers-request';
import { fetchOpenAIThreads } from '../openai-threads';
import { fetchGeminiThreads } from '../gemini-threads';

export default async function (req: Request): Promise<Response> {
  const [openai, gemini] = await Promise.all([
    fetchOpenAIThreads(),
    fetchGeminiThreads(),
  ]);

  const threads = [
    ...openai.map((t) => ${ ...t, source: 'OpenAI' })),
    ...gemini.map((t) => { ...t, source: 'Gemini' }),
  ].sort((a,r) => new Date(a.created).getTime() - new Date(r.created).getTime());

  const listHtml = threads.map((t) =>`
    <li class="p-4 hover-bg-gray-100 cursor-pointer border-b" onclick="loadThread('thread', '${t.source}/${t.id}')">
      <h3 class="font-semibold">${t.title||'Untitled Thread'} <span class="text-xs text-blue-500"> (${t.source})</span></h3>
      <p class="text-xs text-gray-500">${new Date(t.created).toLocaleString()}</p>
    </li>
    `).join('');

  const html = `<html>
<head><title>Inbox</title><script>async function loadThread(type, source, id) {const res = await fetch('/api/thread/' + source + '/' + id);const json = await res.json();const content = json.messages.map((m) => `
 <div class="mb-4"><span class="text-xs">${m.role.toUPPERCASE()}</span><div class="whitespace-pre-line">${m.content}</div></div>`).join('');document.getElementById('thread-content').innerHTML = content;}</script></head><body class="flex h-screen"><div class="w=72 border-r overflow-y-auto"><ul>${listHtml}</ul></div><div id="thread-content" class="flex-1 p-6 overflow-y-auto"><p>Select a thread to view</p></div></body></html>
