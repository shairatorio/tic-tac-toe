/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        audiowide: ['Audiowide', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        red: '#e25041',
        green: '#1cbd9e',
        'dark-blue': '#0e1f3c',
      },
    },
  },
  plugins: [],
};