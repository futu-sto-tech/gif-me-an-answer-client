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
    },
  },
  variants: {},
  plugins: [],
};
