/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        rebankPrimary: "var(--color-rebankPrimary)",
        rebankYellow: "var(--color-rebankYellow)",
        rebankPurple: "var(--color-rebankPurple)",
        rebankGrey: "var(--color-rebankGrey)",
        redError: "var(--color-redError)",
        rebankBackground: "var(--color-rebankBackground)",
      }
    }
  },
  plugins: []
};
