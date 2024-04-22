/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "selector",
  mode: "jit",
  purge: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  content: [
    "./**/*.html", // Include all HTML files in your project
    "./**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};

