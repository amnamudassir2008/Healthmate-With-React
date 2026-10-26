import { Bell, Search, Menu, ChevronDown, Globe2 } from 'lucide-react'
export default function Header({ onMenu, language, setLanguage, search, setSearch }) {
  return <header className="sticky top-0 z-30 border-b border-slate-100/80 bg-[#f7f8fc]/90 backdrop-blur-xl">
    <div className="flex h-16 items-center gap-2 sm:h-[76px] sm:gap-3 px-4 sm:px-6 lg:px-9">
      <button onClick={onMenu} aria-label="Open navigation" className="focus-ring grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-slate-200 bg-white text-slate-600 lg:hidden"><Menu size={19}/></button>
      <div className="relative hidden max-w-md flex-1 sm:block">
        <Search size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"/>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports, vitals..." className="focus-ring h-11 w-full rounded-xl border border-slate-200/80 bg-white pl-10 pr-4 text-sm outline-none placeholder:text-slate-400 focus:border-violet/40"/>
      </div>
      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <button onClick={() => setLanguage(language === 'en' ? 'ur' : 'en')} className="focus-ring flex h-10 items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 text-xs font-bold text-slate-600 hover:border-violet/30"><Globe2 size={15}/><span>{language === 'en' ? 'EN' : 'Roman Urdu'}</span></button>
        <button aria-label="Notifications (demo)" className="relative grid h-10 w-10 place-items-center rounded-xl border border-slate-200 bg-white text-slate-500 hover:text-violet"><Bell size={17}/><span className="absolute right-2.5 top-2 h-1.5 w-1.5 rounded-full bg-rose-500 ring-2 ring-white"/></button>
        <div className="hidden h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-amber-100 to-rose-100 text-xs font-extrabold text-rose-700 sm:grid">AK</div>
        <button className="hidden items-center gap-1 text-left sm:flex"><span className="text-xs font-bold text-ink">Ayesha Khan</span><ChevronDown size={14} className="text-muted"/></button>
      </div>
    </div>
    <div className="px-4 pb-3 sm:hidden"><div className="relative"><Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"/><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search reports, vitals..." className="focus-ring h-10 w-full rounded-xl border border-slate-200 bg-white pl-9 pr-3 text-sm outline-none"/></div></div>
  </header>
}