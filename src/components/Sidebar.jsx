import { Activity, LayoutDashboard, Files, CloudUpload, HeartPulse, CalendarDays, Settings2, LogOut, X, Sparkles, Bot } from 'lucide-react'
const icons = { dashboard: LayoutDashboard, reports: Files, upload: CloudUpload, vitals: HeartPulse, timeline: CalendarDays, settings: Settings2, assistant: Bot }
export default function Sidebar({ active, setActive, open, setOpen }) {
  const nav = [
    ['dashboard','Dashboard'],['reports','My reports'],['upload','Upload report'],['vitals','Vitals tracker'],['timeline','Health timeline'],['assistant','Amna AI Assistant'],['settings','Settings']
  ]
  return <>
    {open && <button aria-label="Close menu overlay" onClick={() => setOpen(false)} className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"/>}
    <aside className={`fixed inset-y-0 left-0 z-50 flex w-[min(264px,88vw)] max-w-[88vw] flex-col overflow-y-auto border-r border-slate-100 bg-white px-4 py-5 [height:100dvh] transition-transform duration-300 lg:sticky lg:top-0 lg:z-20 lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex items-center justify-between px-2">
        <button onClick={() => {setActive('dashboard');setOpen(false)}} className="focus-ring flex items-center gap-2.5 rounded-xl text-left">
          <span className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-violet to-indigo-700 text-white shadow-lg shadow-violet/20"><Activity size={23}/></span>
          <span><span className="block font-display text-lg font-extrabold tracking-tight text-ink">Amna HealthMate</span><span className="block text-[10px] font-semibold tracking-wide text-muted">SEHAT KA SMART DOST</span></span>
        </button>
        <button className="rounded-lg p-2 text-muted hover:bg-slate-50 lg:hidden" onClick={() => setOpen(false)} aria-label="Close navigation"><X size={18}/></button>
      </div>
      <div className="mt-9 px-3 text-[10px] font-extrabold uppercase tracking-[.18em] text-slate-400">Workspace</div>
      <nav className="mt-3 space-y-1">
        {nav.map(([id,label]) => {
          const Icon = icons[id]
          return <button key={id} onClick={() => {setActive(id);setOpen(false)}} className={`focus-ring flex w-full items-center gap-3 rounded-xl px-3.5 py-3 text-left text-sm font-semibold transition ${active === id ? 'bg-violet-50 text-violet shadow-sm shadow-violet/5' : 'text-slate-500 hover:bg-slate-50 hover:text-ink'}`}>
            <Icon size={18}/>{label}{id === 'upload' && <span className="ml-auto rounded-md bg-white px-2 py-0.5 text-[10px] font-bold text-violet">NEW</span>}
          </button>
        })}
      </nav>
      <div className="mt-8 rounded-2xl bg-gradient-to-br from-[#262c63] via-[#3e3b8d] to-[#6658dc] p-4 text-white">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/15"><Sparkles size={18}/></div>
        <p className="mt-3 text-sm font-bold">Your health, in one place</p>
        <p className="mt-1 text-xs leading-5 text-white/70">Keep reports organized and prepare better questions for your doctor.</p>
        <button onClick={() => {setActive('upload');setOpen(false)}} className="mt-4 w-full rounded-xl bg-white px-3 py-2.5 text-xs font-extrabold text-indigo-800 transition hover:bg-indigo-50">Add a report <span className="ml-1">↗</span></button>
      </div>
      <div className="mt-4 flex items-center gap-3 rounded-xl px-2 py-3">
        <div className="grid h-9 w-9 place-items-center rounded-full bg-teal-50 text-sm font-extrabold text-teal-700">AM</div>
        <div className="min-w-0 flex-1"><p className="truncate text-xs font-bold text-ink">Amna Mudassir Sheikh</p><p className="text-[10px] text-muted">Personal health space</p></div>
        <LogOut size={16} className="text-slate-300"/>
      </div>
    </aside>
  </>
}