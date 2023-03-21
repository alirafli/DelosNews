/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1C9AD0",
        "primary-dark": "#21334D",
        "primary-sky": "#2F75BA",
        black: "#222222",
        grey: "#3A3A3C",
        "brown-peanut": "#84754D",
      },
    },
  },
  plugins: [],
};
