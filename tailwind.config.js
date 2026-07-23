/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./app/**/*.{js,jsx,ts,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: "#0b1020",
        card: "rgba(255,255,255,0.06)",
        glass: "rgba(255,255,255,0.06)"
      },
      fontFamily: {
        display: ["Inter_600SemiBold", "System"]
      }
    }
  },
  plugins: []
};
