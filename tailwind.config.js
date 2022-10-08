/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-background': '#2e2e2e',
        'custom-secondary': '#2d3748',
        'custom-yellow': '#e5b567',
        'custom-green': '#b4d273',
        'custom-orange': '#e87d3e',
        'custom-purple': '#9e86c8',
        'custom-pink': '#b05279',
        'custom-blue': '#6c99bb',
      },
    },
  },
  plugins: [],
};
