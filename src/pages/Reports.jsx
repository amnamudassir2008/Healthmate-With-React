import { Search, FileText, SlidersHorizontal } from 'lucide-react'
import ReportCard from '../components/ReportCard'
export default function Reports({ reports, onView, onNavigate, search }) {
  const list = reports.filter(r => `${r.name} ${r.type} ${r.fileName}`.toLowerCase().includes(search.toLowerCase()))
  return <div>
    <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-violet">HEALTH LIBRARY</p><h1 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">My reports</h1><p className="mt-2 text-sm text-muted">Keep your medical documents organized in one place.</p></div><button onClick={() => onNavigate('upload')} className="focus-ring inline-flex w-full items-center justify-center gap-2 rounded-xl bg-violet sm:w-auto px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet/20 hover:bg-indigo-700">+ Upload report</button></div>
    <div className="mb-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-slate-100 bg-white p-4"><div className="flex items-center gap-2 text-sm font-bold text-ink"><FileText size={17} className="text-violet"/> All documents <span className="rounded-full bg-violet-50 px-2 py-0.5 text-xs text-violet">{list.length}</span></div><span className="flex items-center gap-1 text-xs text-muted"><SlidersHorizontal size={14}/> Sorted by recent</span></div>
    <div className="grid gap-3 md:grid-cols-2">{list.map(r => <ReportCard key={r.id} report={r} onView={onView}/>)}</div>
    {list.length===0 && <div className="rounded-2xl border border-dashed border-slate-200 bg-white px-5 py-14 text-center"><Search className="mx-auto text-slate-300" size={28}/><p className="mt-3 font-bold text-ink">No reports found</p><p className="mt-1 text-sm text-muted">Try another search or upload a report.</p></div>}
    <div className="mt-6 rounded-2xl bg-indigo-50/70 p-4 text-xs leading-5 text-indigo-900/75">Privacy reminder: this prototype stores no real medical documents in a secure backend. Connect authenticated storage and access rules before using real patient data.</div>
  </div>
}