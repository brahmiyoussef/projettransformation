module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        customColor: '#F4C283',      // Custom color for use in the application
        secondaryColor: '#ED5F49',   // Secondary color for hover states, etc.
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
