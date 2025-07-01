// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red': '#B91C1C', // Warna merah utama dari desain
        'brand-red-dark': '#991B1B',
        'brand-light': '#FEF2F2', // Warna latar belakang halaman
        'brand-gray': '#4B5563',
      }
    },
  },
  plugins: [],
}