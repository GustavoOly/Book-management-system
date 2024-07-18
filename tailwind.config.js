/** u/type {import('tailwindcss').Config} */

module.exports = {

  content: [

    "./src/renderer/index.html",

    "./src/renderer/src/**/*.{svelte,js,ts,jsx,tsx}",

  ],

  theme: {
    colors: {
      'primary': '#DF4E29',
      'secundary': 'white',
      'tertiary': '#D9D9D9',
      'quartenary': 'black',
      'quinary': '#f3f3f3'
    },

    extend: {},

  },

  plugins: [],

}