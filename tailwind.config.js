/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'] },
      colors: {
        ink: '#18213f',
        muted: '#78819d',
        violet: { DEFAULT:'#6959ee', 50:'#f5f3ff',100:'#ede9fe',200:'#ddd6fe',300:'#c4b5fd',400:'#a78bfa',500:'#8b5cf6',600:'#7c3aed',700:'#6d28d9',800:'#5b21b6',900:'#4c1d95' },
        mint: '#20bfa9',
        lilac: '#efedff',
      },
      boxShadow: {
        soft: '0 18px 50px rgba(38, 49, 95, .08)',
        card: '0 8px 28px rgba(38, 49, 95, .06)',
      },
    },
  },
  plugins: [],
}