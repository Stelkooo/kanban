/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      padding: {
        4.5: '1.125rem/* 18px */',
      },
      margin: {
        4.125: '1.125rem/* 18px */',
      },
      height: {
        1.5625: '1.5625/* 25px */',
      },
      gridAutoRows: {
        8: 'repeat(8, minmax(0, 1fr))',
        layout: 'min-content 1fr',
      },
      animation: {
        'fade-up': 'fade-up .25s ease-in-out',
        'fade-in': 'fade-in .25s ease-in-out',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0px)' },
        },
        'fade-in': {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
    },
    colors: {
      black: '#000112',
      'very-dark-grey': '#20212C',
      'dark-grey': '#2B2C37',
      'lines-dark': '#3E3F4E',
      'medium-grey': '#828FA3',
      'lines-light': '#E4EBFA',
      'light-grey': '#F4F7FD',
      white: '#FFFFFF',
      purple: '#635FC7',
      'purple-hover': '#A8A4FF',
      red: '#EA5555',
      'red-hover': '#FF9898',
    },
  },
  plugins: [],
};
