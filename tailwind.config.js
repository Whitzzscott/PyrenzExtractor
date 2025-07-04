/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./**/*.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      colors: {
        pyrenz: {
          DEFAULT: '#00C2FF',
          dark: '#0a192f',
        },
      },
    },
  },
  plugins: [],
}
