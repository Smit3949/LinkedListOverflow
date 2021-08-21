module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      height: {
       "50px": "200px"
      },
      width: {
        "50px": "700px",
        "100px": "1000px"
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}