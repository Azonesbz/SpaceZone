/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      karla: ['Karla', 'sans-serif'],
      kanit: ['Kanit', 'sans-serif'],
      raleway: ['Raleway', 'sans-serif'],
      roboto: ['Roboto', 'sans-serif'],
      rajdhani: ['Rajdhani', 'sans-serif']
    }
  },
  plugins: [],
}

