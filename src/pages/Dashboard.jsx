import { Activity, FileText, HeartPulse, CalendarClock, Plus, ArrowRight, Sparkles, ShieldCheck, CircleHelp, TrendingUp, Clock3 } from 'lucide-react'
import StatCard from '../components/StatCard'
import ReportCard from '../components/ReportCard'
import { greeting, formatDate } from '../utils/format'

function SectionHeading({ title, subtitle, action, onAction }) {
  return <div className="mb-4 flex items-end justify-between gap-3"><div><h2 className="font-display text-base font-extrabold text-ink sm:text-lg">{title}</h2>{subtitle && <p className="mt-1 text-xs text-muted">{subtitle}</p>}</div>{action && <button onClick={onAction} className="focus-ring flex shrink-0 items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-bold text-violet hover:bg-violet-50">{action}<ArrowRight size={14}/></button>}</div>
}
export default function Dashboard({ reports, vitals, onNavigate, onView, language }) {
  const isUr = language === 'ur'
  const latest = vitals[0]
  return <div className="space-y-7">
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#282c68] via-[#4542a0] to-[#6659e9] p-5 text-white shadow-soft sm:p-7 lg:p-8">
      <div className="absolute -right-10 -top-16 h-52 w-52 rounded-full border-[30px] border-white/5"/><div className="absolute right-24 top-16 h-20 w-20 rounded-full bg-teal-300/10 blur-xl"/>
      <div className="relative z-10 max-w-2xl sm:pr-32 lg:pr-44">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[10px] font-bold tracking-wide text-white/90"><Sparkles size={13}/> YOUR PERSONAL HEALTH SPACE</span>
        <h1 className="mt-4 font-display text-2xl font-extrabold tracking-tight sm:text-3xl">{greeting()}, Ayesha <span>✦</span></h1>
        <p className="mt-2 max-w-lg text-sm leading-6 text-white/75">{isUr ? 'Apni reports, readings aur health history ko ek hi jagah par organize karein.' : 'Your health story, organized in one calm and simple place.'}</p>
        <div className="mt-5 flex flex-wrap gap-2.5"><button onClick={() => onNavigate('upload')} className="focus-ring inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-xs font-extrabold text-indigo-800 shadow-lg transition hover:-translate-y-0.5 hover:bg-indigo-50"><Plus size={16}/> Upload a report</button><button onClick={() => onNavigate('vitals')} className="focus-ring inline-flex items-center gap-2 rounded-xl border border-white/25 bg-white/10 px-4 py-3 text-xs font-bold text-white transition hover:bg-white/15"><HeartPulse size={16}/> Add vitals</button></div>
      </div>
      <div className="floaty absolute bottom-4 right-5 hidden h-28 w-28 items-center justify-center rounded-[2rem] border border-white/20 bg-white/10 text-white/90 backdrop-blur sm:flex lg:bottom-7 lg:right-10 lg:h-36 lg:w-36"><div className="text-center"><HeartPulse size={38} className="mx-auto"/><p className="mt-2 text-[10px] font-bold tracking-wide">CARE, MADE CLEAR</p></div></div>
    </section>

    <section className="grid grid-cols-1 gap-3 min-[420px]:grid-cols-2 xl:grid-cols-4">
      <StatCard icon={FileText} label="Saved reports" value={reports.length} note="Across your health history" tone="violet"/>
      <StatCard icon={HeartPulse} label="Vitals entries" value={vitals.length} note="Manually recorded readings" tone="mint"/>
      <StatCard icon={CalendarClock} label="Next check-up" value="Add date" note="Set a reminder in your calendar" tone="coral"/>
      <StatCard icon={Activity} label="Latest BP" value={latest?.kind === 'bp' ? latest.value : '120/80'} note="Demo reading · mmHg" tone="amber"/>
    </section>

    <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(0,.75fr)]">
      <div className="min-w-0">
        <SectionHeading title="Recent reports" subtitle="Your latest saved health documents" action="View all" onAction={() => onNavigate('reports')}/>
        <div className="space-y-3">{reports.slice(0,3).map(report => <ReportCard key={report.id} report={report} onView={onView}/>)}
          {reports.length === 0 && <div className="rounded-2xl border border-dashed border-slate-200 bg-white p-8 text-center text-sm text-muted">No reports yet. Upload your first report to get started.</div>}
        </div>
      </div>
      <div className="min-w-0">
        <SectionHeading title="Vitals overview" subtitle="Latest manual readings" action="Track vitals" onAction={() => onNavigate('vitals')}/>
        <div className="space-y-3 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:p-5">
          {[
            {label:'Blood pressure',value:vitals.find(v=>v.kind==='bp')?.value || '—',unit:'mmHg',color:'rose',icon:HeartPulse},
            {label:'Blood sugar',value:vitals.find(v=>v.kind==='sugar')?.value || '—',unit:'mg/dL',color:'sky',icon:Activity},
            {label:'Weight',value:vitals.find(v=>v.kind==='weight')?.value || '—',unit:'kg',color:'teal',icon:TrendingUp},
          ].map((v,i) => <div key={v.label} className="flex items-center gap-3 rounded-xl p-2 transition hover:bg-slate-50">
            <span className={`grid h-10 w-10 place-items-center rounded-xl ${v.color==='rose'?'bg-rose-50 text-rose-500':v.color==='sky'?'bg-sky-50 text-sky-600':'bg-teal-50 text-teal-600'}`}><v.icon size={18}/></span>
            <div className="min-w-0 flex-1"><p className="text-xs font-bold text-ink">{v.label}</p><p className="mt-1 text-[10px] text-muted">{i===0?'Latest recorded value':'Latest entry'}</p></div>
            <p className="shrink-0 font-display text-lg font-extrabold text-ink">{v.value}<span className="ml-1 text-[10px] font-semibold text-muted">{v.unit}</span></p>
          </div>)}
          <div className="mt-1 flex items-start gap-2 rounded-xl bg-teal-50/70 p-3 text-[11px] leading-5 text-teal-900"><ShieldCheck size={15} className="mt-0.5 shrink-0 text-teal-600"/> Keep entries dated and discuss health concerns with your clinician.</div>
        </div>
      </div>
    </section>

    <section className="grid gap-4 md:grid-cols-2">
      <button onClick={() => onNavigate('timeline')} className="focus-ring group flex w-full items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 text-left sm:p-5 shadow-card transition hover:-translate-y-0.5 hover:shadow-soft">
        <span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-violet-50 text-violet"><Clock3 size={22}/></span><span className="min-w-0 flex-1"><span className="block font-display font-extrabold text-ink">Your health timeline</span><span className="mt-1 block text-xs text-muted">See reports and vitals by date.</span></span><ArrowRight size={17} className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-violet"/>
      </button>
      <div className="flex items-center gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-card sm:p-5"><span className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-amber-50 text-amber-600"><CircleHelp size={22}/></span><div><p className="font-display font-extrabold text-ink">A note about AI</p><p className="mt-1 text-xs leading-5 text-muted">Demo insights are examples only. Always ask a qualified doctor about real results.</p></div></div>
    </section>
    <p className="text-center text-[10px] leading-5 text-slate-400">Demo workspace · Sample data only · Not a medical device or diagnostic tool</p>
  </div>
}