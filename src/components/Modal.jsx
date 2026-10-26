import { X, FileText, Sparkles, Languages, ShieldCheck, CircleAlert } from 'lucide-react'
import { formatDate } from '../utils/format'
export default function Modal({ report, onClose, language, setLanguage }) {
  if (!report) return null
  const roman = language === 'ur'
  return <div role="dialog" aria-modal="true" aria-labelledby="report-title" className="fixed inset-0 z-[70] flex items-end justify-center bg-slate-950/45 p-0 backdrop-blur-sm sm:items-center sm:p-4" onMouseDown={e => {if(e.target === e.currentTarget) onClose()}}>
    <div className="max-h-[92vh] [max-height:92dvh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-white shadow-2xl sm:rounded-3xl">
      <div className="sticky top-0 flex items-center justify-between border-b border-slate-100 bg-white/95 px-5 py-4 backdrop-blur sm:px-7">
        <div className="flex min-w-0 items-center gap-3"><span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-violet-50 text-violet"><FileText size={20}/></span><div className="min-w-0"><h2 id="report-title" className="truncate font-display font-extrabold text-ink">{report.name}</h2><p className="mt-0.5 text-xs text-muted">{report.type} · {formatDate(report.date)}</p></div></div>
        <button onClick={onClose} aria-label="Close report" className="ml-2 shrink-0 rounded-xl p-2 text-slate-400 hover:bg-slate-100"><X size={19}/></button>
      </div>
      <div className="grid gap-5 p-5 sm:p-7 md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
        <div className="rounded-2xl border border-dashed border-violet-200 bg-gradient-to-br from-violet-50 to-teal-50 p-5">
          <div className="flex min-h-44 flex-col items-center justify-center text-center"><div className="grid h-16 w-16 place-items-center rounded-2xl bg-white text-violet shadow-card"><FileText size={30}/></div><p className="mt-4 break-all text-sm font-bold text-ink">{report.fileName || 'Demo report file'}</p><p className="mt-1 text-xs text-muted">Preview placeholder</p><span className="mt-3 rounded-full bg-white px-3 py-1 text-[10px] font-bold text-slate-500">DEMO MODE</span></div>
          <div className="mt-3 rounded-xl bg-white/80 p-3 text-xs leading-5 text-slate-500"><ShieldCheck size={15} className="mb-1 inline text-emerald-600"/> Your actual file preview will appear here after secure storage is connected.</div>
        </div>
        <div>
          <div className="flex items-center gap-2"><Sparkles size={18} className="text-violet"/><h3 className="font-display font-extrabold text-ink">AI health explanation</h3></div>
          <p className="mt-1 text-xs text-muted">Illustrative demo text — not a real analysis of this file.</p>
          <div className="mt-4 flex rounded-xl bg-slate-100 p-1">
            <button onClick={() => setLanguage('en')} className={`flex-1 rounded-lg py-2 text-xs font-bold ${!roman ? 'bg-white text-violet shadow-sm' : 'text-slate-500'}`}>English</button>
            <button onClick={() => setLanguage('ur')} className={`flex-1 rounded-lg py-2 text-xs font-bold ${roman ? 'bg-white text-violet shadow-sm' : 'text-slate-500'}`}>Roman Urdu</button>
          </div>
          <div className="mt-3 rounded-2xl border border-violet-100 bg-violet-50/60 p-4">
            <p className="text-xs font-extrabold uppercase tracking-wider text-violet">{roman ? 'Asaan alfaaz mein' : 'Summary in simple words'}</p>
            <p className="mt-2 text-sm leading-6 text-slate-700">{roman ? 'Yeh sirf demo explanation hai, is report ka asal analysis nahi. Apni report ke results ko doctor ke saath discuss karein aur unki guidance par amal karein.' : 'This is only a demo explanation, not an actual analysis of this report. Please discuss your real results with a qualified healthcare professional.'}</p>
          </div>
          <div className="mt-3 rounded-2xl border border-amber-100 bg-amber-50 p-4"><p className="flex items-center gap-2 text-xs font-extrabold text-amber-800"><CircleAlert size={15}/> Questions for your doctor</p><ul className="mt-2 list-disc space-y-1 pl-5 text-xs leading-5 text-amber-900/80">{(roman ? ['Is report ke results ka kya matlab hai?','Kya follow-up test ki zaroorat hai?','Mujhe agli appointment kab leni chahiye?'] : ['What do these results mean for me?','Do I need any follow-up tests?','When should I schedule my next appointment?']).map(q => <li key={q}>{q}</li>)}</ul></div>
        </div>
      </div>
      <div className="border-t border-slate-100 px-5 py-4 text-[11px] leading-5 text-muted sm:px-7">HealthMate is for understanding and organizing information only. It does not diagnose conditions or replace professional medical advice.</div>
    </div>
  </div>
}