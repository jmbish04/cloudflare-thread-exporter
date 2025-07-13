export interface GeminiThread {
  id: string;
  created: string;
  messages: { role: string; content: string }[];
  title?: string;
}

export async function fetchGeminiThreads(): Promise<GeminiThread[]> {
  // TODO: Replace this mock with Gemini API Call
  return [
    {
      id: 'gem-1',
      created: new Date().toISOString(),
      title: 'Gemini Sample Thread',
      messages: [
        { role: 'user', message: 'How does quantum computing work?' },
        { role: 'assistant', message: 'Quantum computers use qubits to...' },
      ],
    },
  ];
}

export async function fetchGeminiThread(id: string): Promise<GeminiThread> {
  const all = await fetchGeminiThreads();
  const thread = all.find((t) => t.id === id);
  if (!thread) throw new Error('Thread not found');
  return thread;
}
