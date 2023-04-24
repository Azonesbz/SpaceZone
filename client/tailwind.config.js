/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'

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
      rajdhani: ['Rajdhani', 'sans-serif'],
      ubuntu: ['Ubuntu', 'sans-serif'],
    },
    scrollbar: {
      width: '12px',
      track: 'bg-gray-200',
      thumb: 'bg-gray-500',
    },
    container: {
      center: true,
    },
  },
  plugins: [
    scrollbar
  ],
}

