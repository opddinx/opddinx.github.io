/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    //`./src/pages/**/*.{js,jsx,ts,tsx}`,
    //`./src/components/**/*.{js,jsx,ts,tsx}`,
    `./src/pages/hw2024.tsx`,
    `./src/pages/timetable.tsx`,
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false, // Disable Preflight (global reset)
  },
}
