/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        'mint-300': 'oklch(0.871 0.15 154.449)',
        'mint-50': 'oklch(0.985 0.002 247.839)',
        
      }
    },
  },
  plugins: [],
}
