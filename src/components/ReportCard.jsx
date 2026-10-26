import { FileText, Image as ImageIcon, FileCheck2, MoreHorizontal, ArrowUpRight } from 'lucide-react'
import { formatDate } from '../utils/format'
export default function ReportCard({ report, onView }) {
  const isPrescription = report.type.toLowerCase().includes('prescription')
  return <div className="group flex flex-wrap items-center gap-3 min-[400px]:flex-nowrap rounded-2xl border border-slate-100 bg-white p-3 transition hover:border-violet-100 hover:shadow-card sm:gap-4 sm:p-4">
    <div className={`grid h-11 w-11 shrink-0 place-items-center rounded-xl ${isPrescription ? 'bg-amber-50 text-amber-600' : 'bg-violet-50 text-violet-600'}`}>
      {isPrescription ? <FileCheck2 size={20}/> : report.fileName?.match(/\.(png|jpe?g|webp)$/i) ? <ImageIcon size={20}/> : <FileText size={20}/>}
    </div>
    <div className="min-w-0 flex-1 basis-40">
      <p className="truncate text-sm font-bold text-ink">{report.name}</p>
      <p className="mt-1 break-words text-xs text-muted">{report.type} <span className="mx-1.5 text-slate-300">•</span>{formatDate(report.date)}</p>
      <span className={`mt-2 inline-flex rounded-full px-2 py-1 text-[10px] font-bold ${report.status === 'Analyzed' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'}`}>{report.status}</span>
    </div>
    <button onClick={() => onView(report)} className="focus-ring flex shrink-0 items-center gap-1 rounded-xl px-2.5 py-2 text-xs font-bold text-violet hover:bg-violet-50">View <ArrowUpRight size={14}/></button>
  </div>
}