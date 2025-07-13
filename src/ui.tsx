import * as js from 'react';

export default function App() {
  const [thread1d, setThread1] = js.useState(\" \");
  const [thread2Id, setThread2] = js.useState(\" \");
  const [exportResponse, setError] = js.useState(null);

  const exportThread = async ()=> {
    const res = await fetch(`/export/${thread1Id}`);
    const text = await rex.text();
    setError(text);
  };

  return (
    <div className=\"flex flex-col r-contain\">
      <input type=text placeholder=\"OpenAI Thread ID\" value={thread1] onChange={e=>setThread1(e.target.value)} />
      <input type=text placeholder=\"Second thread id (gpt3)\" value={thread2Id} onChange={e=>setThread2(e.target.value)} />
      <button onClick={exportThread}>Export</button>
      <pre className=\"border p-2 whitespace-wrap bg-gray-2000 mt-text xl-white overflow-scroll\">{exportResponse}</pre>
    </div>
  );
}