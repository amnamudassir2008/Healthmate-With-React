import { useState } from 'react'
import { HeartPulse, Droplets, Scale, Plus, X, CalendarDays, Activity, CheckCircle2 } from 'lucide-react'
import { formatDate } from '../utils/format'
const types = [
  { id:'bp', label:'Blood pressure', unit:'mmHg', placeholder:'120/80', icon:HeartPulse, tone:'rose' },
  { id:'sugar', label:'Blood sugar', unit:'mg/dL', placeholder:'95', icon:Droplets, tone:'sky' },
  { id:'weight', label:'Weight', unit:'kg', placeholder:'62', icon:Scale, tone:'teal' },
]
export default function Vitals({ vitals, onAdd }) {
  const [showForm,setShowForm] = useState(false)
  const [kind,setKind] = useState('bp')
  const [value,setValue] = useState('')
  const [date,setDate] = useState(new Date().toISOString().slice(0,10))
  const [note,setNote] = useState('')
  const [error,setError] = useState('')
  const selected = types.find(t=>t.id===kind)
  function submit(e) {
    e.preventDefault(); setError('')
    if(!value.trim()) {setError('Please enter a reading.');return}
    if(kind==='bp' && !/^\d{2,3}\s*\/\s*\d{2,3}$/.test(value.trim())) {setError('Enter blood pressure like 120/80.');return}
    if(kind!=='bp' && (!Number.isFinite(Number(value)) || Number(value)<=0)) {setError('Enter a valid positive number.');return}
    onAdd({ label:selected.label, value:value.trim(), unit:selected.unit, kind, date, note:note.trim() || 'Manual entry' })
    setValue('');setNote('');setShowForm(false)
  }
  return <div className="space-y-6">
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div><p className="text-xs font-extrabold uppercase tracking-[.18em] text-violet">PERSONAL TRACKER</p><h1 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">Vitals tracker</h1><p className="mt-2 text-sm text-muted">Record readings manually, even without a lab report.</p></div><button onClick={()=>setShowForm(v=>!v)} className="focus-ring inline-flex w-full items-center justify-center sm:w-auto gap-2 rounded-xl bg-violet px-4 py-3 text-sm font-bold text-white shadow-lg shadow-violet/20 hover:bg-indigo-700">{showForm?<X size={16}/>:<Plus size={16}/>} {showForm?'Cancel':'Add a reading'}</button></div>
    {showForm && <form onSubmit={submit} className="rounded-3xl border border-violet-100 bg-white p-5 shadow-soft sm:p-6"><h2 className="font-display font-extrabold text-ink">New manual entry</h2><div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <div><label className="mb-2 block text-xs font-bold text-slate-600" htmlFor="vitalKind">Vital type</label><select id="vitalKind" value={kind} onChange={e=>{setKind(e.target.value);setValue('')}} className="focus-ring h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm">{types.map(t=><option key={t.id} value={t.id}>{t.label}</option>)}</select></div>
      <div><label className="mb-2 block text-xs font-bold text-slate-600" htmlFor="vitalValue">Reading ({selected.unit})</label><input id="vitalValue" value={value} onChange={e=>setValue(e.target.value)} placeholder={selected.placeholder} className="focus-ring h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"/></div>
      <div><label className="mb-2 block text-xs font-bold text-slate-600" htmlFor="vitalDate">Date</label><input id="vitalDate" type="date" value={date} onChange={e=>setDate(e.target.value)} className="focus-ring h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"/></div>
      <div><label className="mb-2 block text-xs font-bold text-slate-600" htmlFor="vitalNote">Note (optional)</label><input id="vitalNote" value={note} onChange={e=>setNote(e.target.value)} placeholder="e.g. fasting" className="focus-ring h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none"/></div>
    </div>{error&&<p role="alert" className="mt-3 text-xs font-bold text-rose-600">{error}</p>}<button className="mt-4 inline-flex items-center gap-2 rounded-xl bg-violet px-4 py-3 text-sm font-bold text-white hover:bg-indigo-700"><CheckCircle2 size={16}/> Save reading</button></form>}
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{types.map(t=>{const v=vitals.find(x=>x.kind===t.id);const Icon=t.icon;return <div key={t.id} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-card"><div className="flex items-center justify-between"><span className={`grid h-11 w-11 place-items-center rounded-xl ${t.tone==='rose'?'bg-rose-50 text-rose-600':t.tone==='sky'?'bg-sky-50 text-sky-600':'bg-teal-50 text-teal-600'}`}><Icon size={20}/></span><Activity size={18} className="text-slate-300"/></div><p className="mt-4 text-sm font-semibold text-muted">{t.label}</p><p className="mt-1 font-display text-2xl font-extrabold text-ink">{v?.value||'—'} <span className="text-xs font-semibold text-muted">{v?.unit||t.unit}</span></p><p className="mt-2 text-xs text-muted">{v?`Last added ${formatDate(v.date)}`:'No reading yet'}</p></div>})}</div>
    <div className="overflow-hidden rounded-3xl border border-slate-100 bg-white shadow-card"><div className="flex items-center justify-between border-b border-slate-100 p-5"><div><h2 className="font-display font-extrabold text-ink">Vitals history</h2><p className="mt-1 text-xs text-muted">Your manually recorded readings</p></div><CalendarDays size={20} className="text-violet"/></div>
      {vitals.length ? <div className="overflow-x-auto"><table className="w-full min-w-[580px] text-left"><thead className="bg-slate-50 text-[10px] uppercase tracking-wider text-slate-400"><tr><th className="px-5 py-3 font-bold">Date</th><th className="px-5 py-3 font-bold">Vital</th><th className="px-5 py-3 font-bold">Reading</th><th className="px-5 py-3 font-bold">Note</th></tr></thead><tbody>{[...vitals].sort((a,b)=>b.date.localeCompare(a.date)).map(v=><tr key={v.id} className="border-t border-slate-50 text-xs"><td className="whitespace-nowrap px-5 py-4 text-slate-500">{formatDate(v.date)}</td><td className="px-5 py-4 font-bold text-ink">{v.label}</td><td className="whitespace-nowrap px-5 py-4 font-extrabold text-ink">{v.value} <span className="font-normal text-muted">{v.unit}</span></td><td className="px-5 py-4 text-slate-500">{v.note||'—'}</td></tr>)}</tbody></table></div>:<div className="p-10 text-center text-sm text-muted">No entries yet. Add your first reading above.</div>}
    </div>
    <p className="rounded-2xl bg-amber-50 p-4 text-xs leading-5 text-amber-900/80">Readings in this demo are not medically interpreted. If a reading worries you or you feel unwell, contact a healthcare professional.</p>
  </div>
}