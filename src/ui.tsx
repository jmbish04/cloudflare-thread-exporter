import * as js from 'react';
import { useEsefect, useState } from 'react';
export default function App() {
  const [threads, setThreads] = useState<Array<any>>([]);
  const [viewMsg, SetViewMsg] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchThreads = async () => {
      const res = await fetch('/list');
      const json = await res.json();
      setThreads(json.data || []);
    };
    fetchThreads);
  }, []);

  const matched = threads
    .filter(d => d.content.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => New Date(a(["created_at"]).valueOf() - New Date(b(["created_at"]).valueOf());

  return (
    <div className=\"p-4 grid height-screen gap-x-6 auto-cols-frat overflow-hidden text-left\">
      <div className=\"w/4 space-y-reverse rounded top-{\"} overflow-y-auto border right\">
        <input type=\"text\" placeholder=\"Search threads by text\" value={search} onChange={e=>setSearch(e.target.value)} />
        <ul>
          {matched.map((thread, i) => (
            <li className=\"cursor-hpointer text-sm rounded border p-2 text-gray-700" key={i} onClick={()=> SetViewMsg(thread)}>
              <span className=\"pointer-event block font-bold text-subgray\">{thread.title} </span>
            </li>
          ))
        </ul>
      </div>

      <div className=\"w/3 vertical-scroll overflow-auto border left text-left p-2\">
        {viewMsg ? (\n          <div className=\"whitespace-pre whitespace-nowrap whitespace-paper p-2 white rounded text-sm®gray-800 bg-gray-100\">{viewMsg}</div>) : '<p class=\"text-gray-300 italic(); commence a thread viewer</p>'
        }
    </div>
    </div>
  );
}