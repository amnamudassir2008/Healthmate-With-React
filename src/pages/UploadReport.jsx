import { useRef, useState } from 'react'
import { CloudUpload, FileText, Image as ImageIcon, ShieldCheck, CheckCircle2, X, Sparkles, Info } from 'lucide-react'
const maxSize = 10 * 1024 * 1024
export default function UploadReport({ onSave, onNavigate }) {
  const inputRef = useRef(null)
  const [file, setFile] = useState(null)
  const [name, setName] = useState('')
  const [type, setType] = useState('Blood Test')
  const [date, setDate] = useState(new Date().toISOString().slice(0,10))
  const [consent, setConsent] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  function pick(f) {
    setError(''); setSuccess(false)
    if (!f) return
    const allowed = ['application/pdf','image/png','image/jpeg','image/webp']
    if (!allowed.includes(f.type)) { setError('Please choose a PDF, PNG, JPG or WEBP file.'); return }
    if (f.size > maxSize) { setError('File is larger than 10 MB. Choose a smaller file.'); return }
    setFile(f)
    if (!name) setName(f.name.replace(/\.[^/.]+$/, '').replace(/[-_]/g,' '))
  }
  function submit(e) {
    e.preventDefault()
    if (!file) {setError('Please select a report file first.'); return}
    if (!consent) {setError('Please confirm that this is a demo upload and not real patient data.'); return}
    onSave({ name: name.trim() || file.name, type, date, fileName: file.name, fileSize: file.size, status: 'Saved', color: 'violet' })
    setSuccess(true); setFile(null); setName(''); setConsent(false)
    if (inputRef.current) inputRef.current.value = ''
  }
  return <div className="mx-auto max-w-4xl">
    <div className="mb-6"><p className="text-xs font-extrabold uppercase tracking-[.18em] text-violet">ADD TO YOUR HEALTH LIBRARY</p><h1 className="mt-2 font-display text-2xl font-extrabold text-ink sm:text-3xl">Upload a report</h1><p className="mt-2 text-sm leading-6 text-muted">Add a document to your demo library. Files are not sent to any server in this prototype.</p></div>
    {success && <div role="status" className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50 p-4 text-sm font-semibold text-emerald-800"><CheckCircle2 size={18}/> Report record added to your current session. Connect secure storage for persistent uploads.</div>}
    <form onSubmit={submit} className="grid gap-5 lg:grid-cols-[1.15fr_.85fr]">
      <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-card sm:p-7">
        <label className={`flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed p-5 text-center transition ${file?'border-emerald-300 bg-emerald-50/40':'border-violet-200 bg-violet-50/30 hover:border-violet-400 hover:bg-violet-50/70'}`} onDragOver={e=>e.preventDefault()} onDrop={e=>{e.preventDefault();pick(e.dataTransfer.files?.[0])}}>
          <input ref={inputRef} type="file" accept=".pdf,.png,.jpg,.jpeg,.webp,application/pdf,image/png,image/jpeg,image/webp" className="sr-only" onChange={e=>pick(e.target.files?.[0])}/>
          <span className={`grid h-14 w-14 place-items-center rounded-2xl ${file?'bg-emerald-100 text-emerald-700':'bg-white text-violet shadow-card'}`}>{file?<CheckCircle2 size={27}/>:<CloudUpload size={27}/>}</span>
          <span className="mt-4 text-sm font-extrabold text-ink">{file ? file.name : 'Drop your report here'}</span>
          <span className="mt-1 text-xs text-muted">{file ? `${(file.size/1024/1024).toFixed(2)} MB · Selected locally` : 'or click to browse your device'}</span>
          <span className="mt-3 rounded-full bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500">PDF, JPG, PNG, WEBP · Max 10 MB</span>
        </label>
        {file && <button type="button" onClick={()=>{setFile(null);if(inputRef.current)inputRef.current.value=''}} className="mt-3 flex items-center gap-1 text-xs font-bold text-rose-600"><X size={14}/> Remove selected file</button>}
        {error && <p role="alert" className="mt-3 rounded-xl bg-rose-50 p-3 text-xs font-semibold text-rose-700">{error}</p>}
        <div className="mt-6 space-y-4">
          <div><label htmlFor="reportName" className="mb-2 block text-xs font-bold text-slate-600">Report name</label><input id="reportName" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Complete Blood Count" className="focus-ring h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-violet/50"/></div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div><label htmlFor="reportType" className="mb-2 block text-xs font-bold text-slate-600">Report type</label><select id="reportType" value={type} onChange={e=>setType(e.target.value)} className="focus-ring h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-violet/50">{['Blood Test','Imaging / X-ray','Ultrasound','Prescription','Other'].map(t=><option key={t}>{t}</option>)}</select></div>
            <div><label htmlFor="reportDate" className="mb-2 block text-xs font-bold text-slate-600">Report date</label><input id="reportDate" type="date" value={date} onChange={e=>setDate(e.target.value)} className="focus-ring h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-violet/50"/></div>
          </div>
        </div>
        <label className="mt-5 flex items-start gap-3 rounded-xl bg-amber-50 p-3.5 text-xs leading-5 text-amber-900"><input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} className="mt-1 accent-violet"/><span>I understand this is a frontend demo. I will not use real patient data or rely on the sample AI content for medical decisions.</span></label>
        <button type="submit" className="focus-ring mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-violet px-4 text-sm font-extrabold text-white shadow-lg shadow-violet/20 transition hover:-translate-y-0.5 hover:bg-indigo-700"><CloudUpload size={17}/> Add report to demo library</button>
      </div>
      <div className="space-y-4">
        <div className="rounded-3xl border border-slate-100 bg-white p-5 shadow-card sm:p-6"><div className="flex items-center gap-2"><ShieldCheck size={18} className="text-emerald-600"/><h2 className="font-display font-extrabold text-ink">Privacy first</h2></div><ul className="mt-4 space-y-3 text-xs leading-5 text-slate-600"><li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/> File is only read locally for this demo flow.</li><li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/> File contents are not uploaded to a cloud service.</li><li className="flex gap-2"><CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-600"/> Real use requires authentication and per-user access rules.</li></ul></div>
        <div className="rounded-3xl bg-gradient-to-br from-[#e9e6ff] to-[#e0faf4] p-5 sm:p-6"><span className="grid h-10 w-10 place-items-center rounded-xl bg-white text-violet shadow-card"><Sparkles size={20}/></span><h2 className="mt-4 font-display text-lg font-extrabold text-ink">AI report insights</h2><p className="mt-2 text-xs leading-5 text-slate-600">The production version can use a secure backend to send the selected report to Gemini and return a bilingual explanation.</p><div className="mt-4 flex items-start gap-2 rounded-xl bg-white/75 p-3 text-[11px] leading-5 text-slate-600"><Info size={14} className="mt-0.5 shrink-0 text-violet"/> No live AI analysis is performed by this ZIP yet.</div><button type="button" onClick={()=>onNavigate('reports')} className="mt-4 text-xs font-extrabold text-violet hover:underline">View report library →</button></div>
      </div>
    </form>
  </div>
}