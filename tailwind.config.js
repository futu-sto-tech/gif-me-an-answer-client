module.exports = {
  darkMode: 'media',
  important: true,
  purge: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/screens/**/*.tsx'],
  theme: {
    extend: {
      colors: {
        pink: {
          DEFAULT: '#DD01A1',
          dark: '#8D0066',
        },
        cyan: '#00EFFF',
        background: '#2D2D2D',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
      },
      animation: { wiggle: 'wiggle 0.3s ease-in-out infinite' },
    },
  },
  variants: {},
  plugins: [],
};
