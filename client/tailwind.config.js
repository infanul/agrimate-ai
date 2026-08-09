/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",   // optional, only if you still have a pages folder
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#2563eb", // Tailwind blue-600
          light: "#3b82f6",   // Tailwind blue-500
          dark: "#1e40af",    // Tailwind blue-800
        },
      },
    },
  },
  plugins: [],
};
