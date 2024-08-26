/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './common/**/*.{js,jsx,ts,tsx}', './features/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        rebankPrimary: 'var(--color-rebankPrimary)',
        rebankYellow: 'var(--color-rebankYellow)',
        rebankPurple: 'var(--color-rebankPurple)',
        rebankBrightPurple: 'var(--color-rebankBrightPurple)',
        rebankGrey: 'var(--color-rebankGrey)',
        rebankDimGrey: 'var(--color-rebankDimGrey)',
        rebankBgGrey: 'var(--color-rebankBgGrey)',
        redError: 'var(--color-redError)',
        inputBackground: 'var(--color-inputBackground)',
        rebankBackground: 'var(--color-rebankBackground)',
      },
    },
  },
  plugins: [],
};
