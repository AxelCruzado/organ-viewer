/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{html,ts}"
  ],
  theme: {
    extend: {
      colors:{
        'mint-400': 'oklch(0.777 0.152 181.912)',
        'mint-950': '#172554',
      }
    },
  },
  plugins: [],
}
