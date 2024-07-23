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
      'quartenary': '#DAA520',
      'quinary': '#f3f3f3',
      'green': '#50C878',
      'red': '#df4d4dff',
      'black': 'black',
    },

    extend: {},

  },

  plugins: [require('tailwindcss-animated')],

}