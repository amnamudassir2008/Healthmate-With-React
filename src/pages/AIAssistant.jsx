import { useState } from 'react'
import { Bot, Send, Sparkles, ShieldCheck, HeartPulse, Languages } from 'lucide-react'

const starters = [
  'Explain a medical report in simple words',
  'What questions should I ask my doctor?',
  'Help me understand blood pressure readings',
]
export default function AIAssistant({ language }) {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([{ role: 'assistant', text: 'Assalam-o-alaikum! I am Amna Mudassir Sheikh AI Assistant. I can help explain general health information in simple English or Roman Urdu. I cannot diagnose, prescribe, or replace your doctor.' }])
  function send(value = input) {
    const text = value.trim(); if (!text) return
    setMessages(prev => [...prev, { role: 'user', text }, { role: 'assistant', text: 'Thanks for your question. This demo assistant is not connected to a live AI model yet, so it cannot analyze your personal reports. For medical concerns, please consult a qualified healthcare professional. You can add a secure Gemini API connection on the backend for real AI responses.' }])
    setInput('')
  }
  return <div className="mx-auto grid w-full max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_240px] xl:grid-cols-[minmax(0,1fr)_260px]">
    <section className="flex h-[calc(100dvh-220px)] min-h-[440px] max-h-[760px] min-w-0 flex-col overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm">
      <div className="flex flex-wrap items-center gap-3 border-b border-slate-100 p-4 sm:p-6">
        <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-700 text-white"><Bot size={25}/></div>
        <div className="min-w-0 flex-1 basis-48"><h2 className="font-display text-base sm:text-xl font-extrabold text-ink sm:text-xl">Amna Mudassir Sheikh AI Assistant</h2><p className="mt-1 text-xs text-muted">Your bilingual health information companion</p></div>
        <span className="rounded-full bg-amber-50 px-3 py-1 text-[10px] font-bold text-amber-700">Demo mode</span>
      </div>
      <div className="flex-1 space-y-4 overflow-y-auto p-3 sm:p-6">
        {messages.map((m,i) => <div key={i} className={`flex gap-2.5 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
          {m.role === 'assistant' && <span className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-100 text-violet-700"><Sparkles size={16}/></span>}
          <div className={`max-w-[88%] min-w-0 break-words [overflow-wrap:anywhere] rounded-2xl px-4 py-3 text-sm leading-6 sm:max-w-[80%] ${m.role === 'user' ? 'bg-violet-600 text-white' : 'bg-slate-50 text-slate-700'}`}>{m.text}</div>
        </div>)}
        {messages.length === 1 && <div className="grid gap-2 pt-2 sm:grid-cols-2">{starters.map(q=><button key={q} onClick={()=>send(q)} className="rounded-xl border border-slate-200 p-3 text-left text-xs font-semibold text-slate-600 transition hover:border-violet-300 hover:bg-violet-50">{q} <span className="text-violet-600">↗</span></button>)}</div>}
      </div>
      <form onSubmit={e=>{e.preventDefault();send()}} className="flex items-end gap-2 border-t border-slate-100 p-3 sm:p-4">
        <textarea aria-label="Ask the AI assistant" rows="1" value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Ask in English or Roman Urdu..." className="max-h-32 min-h-[44px] min-w-0 flex-1 resize-y rounded-xl border border-slate-200 px-3 py-3 text-sm outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-100"/>
        <button aria-label="Send message" type="submit" className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-violet-600 text-white transition hover:bg-violet-700"><Send size={17}/></button>
      </form>
    </section>
    <aside className="space-y-4">
      <div className="rounded-2xl border border-violet-100 bg-violet-50 p-4 sm:p-5"><div className="flex items-center gap-2 text-violet-800"><Languages size={18}/><h3 className="text-sm font-extrabold">Bilingual support</h3></div><p className="mt-2 text-xs leading-5 text-violet-900/75">Ask questions in English or Roman Urdu. Responses in this prototype are sample messages.</p></div>
      <div className="rounded-2xl border border-emerald-100 bg-emerald-50 p-4 sm:p-5"><div className="flex items-center gap-2 text-emerald-800"><ShieldCheck size={18}/><h3 className="text-sm font-extrabold">Privacy & safety</h3></div><p className="mt-2 text-xs leading-5 text-emerald-900/75">Do not enter personal medical details in this demo. Real report analysis requires secure backend integration.</p></div>
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5"><div className="flex items-center gap-2 text-slate-700"><HeartPulse size={18}/><h3 className="text-sm font-extrabold">Health disclaimer</h3></div><p className="mt-2 text-xs leading-5 text-muted">AI is for understanding only, not for diagnosis or treatment. Always consult your doctor.</p></div>
    </aside>
  </div>
}
