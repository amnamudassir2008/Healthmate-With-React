import { useMemo, useState } from 'react'
import { HeartPulse, Activity, ArrowUpRight, Menu, Sparkles, Stethoscope, ChevronRight } from 'lucide-react'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Modal from './components/Modal'
import Dashboard from './pages/Dashboard'
import Reports from './pages/Reports'
import UploadReport from './pages/UploadReport'
import Vitals from './pages/Vitals'
import Timeline from './pages/Timeline'
import Settings from './pages/Settings'
import AIAssistant from './pages/AIAssistant'
import { initialReports, initialVitals } from './data/demoData'

const pageTitles = { dashboard:'Dashboard', reports:'My reports', upload:'Upload report', vitals:'Vitals tracker', timeline:'Health timeline', settings:'Settings', assistant:'Amna Mudassir Sheikh AI Assistant' }
export default function App() {
  const [active,setActive] = useState('dashboard')
  const [menuOpen,setMenuOpen] = useState(false)
  const [language,setLanguage] = useState('en')
  const [search,setSearch] = useState('')
  const [reports,setReports] = useState(initialReports)
  const [vitals,setVitals] = useState(initialVitals)
  const [selectedReport,setSelectedReport] = useState(null)

  const filteredReports = useMemo(() => reports.filter(r => `${r.name} ${r.type} ${r.fileName||''}`.toLowerCase().includes(search.toLowerCase())),[reports,search])
  function addReport(data) {
    setReports(prev => [{...data,id:Date.now()},...prev])
    setActive('reports')
  }
  function addVital(data) {
    setVitals(prev => [{...data,id:Date.now()},...prev])
  }
  function navigate(page) { setActive(page); setSearch(''); window.scrollTo({top:0,behavior:'smooth'}) }

  const page = {
    dashboard: <Dashboard reports={reports} vitals={vitals} onNavigate={navigate} onView={setSelectedReport} language={language}/>,
    reports: <Reports reports={filteredReports} onView={setSelectedReport} onNavigate={navigate} search={search}/>,
    upload: <UploadReport onSave={addReport} onNavigate={navigate}/>,
    vitals: <Vitals vitals={vitals} onAdd={addVital}/>,
    timeline: <Timeline reports={reports} vitals={vitals} onView={setSelectedReport}/>,
    settings: <Settings language={language} setLanguage={setLanguage}/>,
    assistant: <AIAssistant language={language}/>,
  }[active]

  return <div className="min-h-screen bg-[#f7f8fc] text-ink">
    <div className="mx-auto flex min-h-screen max-w-[1800px]">
      <Sidebar active={active} setActive={navigate} open={menuOpen} setOpen={setMenuOpen}/>
      <div className="min-w-0 flex-1">
        <Header onMenu={()=>setMenuOpen(true)} language={language} setLanguage={setLanguage} search={search} setSearch={setSearch}/>
        <main className="mx-auto w-full max-w-[1500px] px-4 py-6 sm:px-6 sm:py-8 lg:px-9 lg:py-9">
          <div className="mb-5 flex items-center gap-2 text-[11px] font-semibold text-muted"><span>Amna HealthMate</span><ChevronRight size={13}/><span className="text-violet">{pageTitles[active]}</span><span className="ml-auto hidden items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-[10px] font-bold text-slate-500 sm:flex"><span className="h-1.5 w-1.5 rounded-full bg-amber-400"/> Frontend demo</span></div>
          {page}
        </main>
        <footer className="mx-auto flex max-w-[1500px] flex-col gap-3 border-t border-slate-200/70 px-4 py-6 text-[10px] leading-5 text-slate-400 sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-9">
          <div className="flex items-center gap-2"><span className="grid h-7 w-7 place-items-center rounded-lg bg-violet-100 text-violet"><HeartPulse size={15}/></span><span><b className="text-slate-600">Amna HealthMate</b> · Sehat ka Smart Dost</span></div>
          <span>React · Vite · Tailwind CSS · Responsive demo</span>
          <span className="max-w-md">For understanding only, not for diagnosis or treatment.</span>
        </footer>
      </div>
    </div>
    <Modal report={selectedReport} onClose={()=>setSelectedReport(null)} language={language} setLanguage={setLanguage}/>
  </div>
}