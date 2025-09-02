/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        'primary-blue': '#1a237e',
        'accent-teal': '#00bcd4',
        'soft-gray': '#f3f4f6',
        'deep-gray': '#4b5563',
      },
    },
  },
  plugins: [],
}