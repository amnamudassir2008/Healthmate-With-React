import { ArrowUpRight } from 'lucide-react'
export default function StatCard({ icon: Icon, label, value, note, tone = 'violet' }) {
  const tones = {
    violet: 'bg-violet-50 text-violet-600',
    mint: 'bg-emerald-50 text-emerald-600',
    coral: 'bg-rose-50 text-rose-600',
    amber: 'bg-amber-50 text-amber-600',
  }
  return <div className="rounded-2xl border border-white bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft sm:p-5">
    <div className="flex items-start justify-between gap-2">
      <span className={`grid h-10 w-10 place-items-center rounded-xl ${tones[tone]}`}><Icon size={19}/></span>
      <ArrowUpRight size={16} className="text-slate-300"/>
    </div>
    <p className="mt-4 text-sm font-medium text-muted">{label}</p>
    <p className="mt-1 truncate font-display text-xl sm:text-2xl font-extrabold tracking-tight text-ink">{value}</p>
    <p className="mt-1 text-xs text-muted">{note}</p>
  </div>
}