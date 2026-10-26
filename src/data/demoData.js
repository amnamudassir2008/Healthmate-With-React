export const initialReports = [
  { id: 1, name: 'Complete Blood Count', type: 'Blood Test', date: '2026-10-10', fileName: 'cbc-october.pdf', status: 'Analyzed', color: 'rose', summary: 'A few values may need follow-up with your clinician.' },
  { id: 2, name: 'Lipid Profile', type: 'Blood Test', date: '2026-10-04', fileName: 'lipid-profile.pdf', status: 'Analyzed', color: 'blue', summary: 'Review cholesterol values with your doctor in context.' },
  { id: 3, name: 'Prescription — Follow-up', type: 'Prescription', date: '2026-09-22', fileName: 'prescription.jpg', status: 'Saved', color: 'amber', summary: 'Saved for your next appointment.' },
]
export const initialVitals = [
  { id: 1, label: 'Blood pressure', value: '120/80', unit: 'mmHg', date: '2026-10-10', note: 'Morning reading', kind: 'bp' },
  { id: 2, label: 'Blood sugar', value: '95', unit: 'mg/dL', date: '2026-10-10', note: 'Fasting', kind: 'sugar' },
  { id: 3, label: 'Weight', value: '62', unit: 'kg', date: '2026-10-08', note: 'Home scale', kind: 'weight' },
]
export const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: 'LayoutDashboard' },
  { id: 'reports', label: 'My reports', icon: 'Files' },
  { id: 'upload', label: 'Upload report', icon: 'CloudUpload' },
  { id: 'vitals', label: 'Vitals tracker', icon: 'HeartPulse' },
  { id: 'timeline', label: 'Health timeline', icon: 'CalendarDays' },
  { id: 'settings', label: 'Settings', icon: 'Settings2' },
]