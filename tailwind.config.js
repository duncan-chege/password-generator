/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "red": "#F64A4A",
        "orange": "#FB7C58",
        "yellow": "#F8CD65",
        "neon-green": "#A4FFAF",
        "almost-white": "#E6E5EA",
        "grey": "#817D92",
        "dark-grey": "#24232C",
        "very-dark-grey": "#18171F",
      }
    },
  },
  plugins: [],
}

