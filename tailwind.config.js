/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-white': '#FFFCFB',
        'warm-cream': '#FFF5F2',
        'powder-pink': '#F9D6DE',
        'blush-pink': '#F6B8C8',
        'rose-pink': '#F48BA8',
        'peach': '#FFC3B0',
        'light-beige': '#F4ECE7',
        'text-brown': '#574A4A',
        'accent-red': '#EF6A86',
        'light-gold': '#F3D9A2',
        'midnight-plum': '#2A1B24', // Fallback for some dark contrasts if needed
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'serif'],
        script: ['"Parisienne"', 'cursive'],
        body: ['"Be Vietnam Pro"', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 8px 30px rgba(244,139,168,0.15)',
        'float': '0 15px 40px rgba(244,139,168,0.25)',
        'inner-soft': 'inset 0 2px 10px rgba(244,139,168,0.1)',
      },
      backgroundImage: {
        'paper': "url('https://www.transparenttextures.com/patterns/cream-paper.png')", // soft texture
      }
    },
  },
  plugins: [],
}
