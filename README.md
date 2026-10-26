# Amna HealthMate — Sehat ka Smart Dost

A responsive React + Vite + Tailwind CSS health dashboard starter project. It includes a polished dashboard UI, report upload preview, manual vitals, timeline, English/Roman Urdu summary toggle, and a demo AI explanation flow.

## Run locally

1. Install Node.js (LTS).
2. Extract the ZIP and open this folder in VS Code.
3. Open the terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

4. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for deployment

```bash
npm run build
npm run preview
```

The production build is created in `dist/`.

## Important: demo vs production

This ZIP is a **frontend project**. The report analysis is a clearly labeled demo simulation; it does not send health files to Gemini and it does not provide real medical analysis. Data is held in the current browser session and is not a secure medical record system.

To make it production-ready:
- Add Firebase Authentication, Firestore and Storage or your own backend.
- Call Gemini from a secure backend / Firebase Cloud Function. Do **not** put the Gemini API key in React or a `VITE_*` variable.
- Add Firebase Security Rules and validate file type/size on the server.
- Add explicit consent, deletion/export controls, access checks, and expiring share links.
- Test the AI output with qualified reviewers. AI summaries are for understanding only, not diagnosis or treatment.
- Do not upload real patient data to this demo.

## Tech stack

- React 18
- Vite
- Tailwind CSS
- lucide-react icons

## Folder structure

```text
src/
  components/
    AppShell.jsx
    Header.jsx
    Sidebar.jsx
    StatCard.jsx
    ReportCard.jsx
    Modal.jsx
  data/
    demoData.js
  pages/
    Dashboard.jsx
    Reports.jsx
    UploadReport.jsx
    Vitals.jsx
    Timeline.jsx
    Settings.jsx
  utils/
    format.js
  App.jsx
  index.css
  main.jsx
```


AI Assistant note: the Amna Mudassir Sheikh AI Assistant page is currently a front-end demo. Connect a secure backend and Gemini API before using real medical reports. Never expose API keys in the React client.
