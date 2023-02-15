/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      rotate: {
        '270': '270deg',
      }
    },
  },
  plugins: [],
}
