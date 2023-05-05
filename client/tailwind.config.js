/** @type {import('tailwindcss').Config} */
import scrollbar from 'tailwind-scrollbar'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
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
      Comfortaa: ['Comfortaa', 'cursive'],
      Comfortaa: ['Comfortaa', 'cursive'],
      Exo2: ['Exo 2', 'sans-serif'],
      FlowCircular: ['Flow Circular', 'cursive'],
      Lato: ['Lato', 'sans-serif'],
      Montserrat: ['Montserrat', 'sans-serif'],
      PlayfairDisplay: ['Playfair Display', 'serif'],
      Quicksand: ['Quicksand', 'sans-serif'],
      SourceSansPro: ['Source Sans Pro', 'sans-serif']
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
    import('flowbite/plugin')
]
}

