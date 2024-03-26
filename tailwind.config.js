/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    "font-bold",
    "text-4xl",
    "flex",
    "flex-col",
    "items-center",
    "font-mono",
    "text-sm",
    "text-center",
    "block",
    "mb-5",
    "text-xl",
  ],
};
