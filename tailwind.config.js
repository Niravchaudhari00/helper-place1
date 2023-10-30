/** @type {import('tailwindcss').Config} */
export default {
 content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        greenbtn:'#25AE88',
        yellowbtn:'#ebba16',
        bannerBgColor:"#f9f9f9"
      }
    },
  },
  plugins: [],
}

