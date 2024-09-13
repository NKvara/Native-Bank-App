/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './common/**/*.{js,jsx,ts,tsx}', './features/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        pashaPrimary: 'var(--color-pashaPrimary)',
        pashaYellow: 'var(--color-pashaYellow)',
        pashaPurple: 'var(--color-pashaPurple)',
        pashaBrightPurple: 'var(--color-pashaBrightPurple)',
        pashaGrey: 'var(--color-pashaGrey)',
        pashaDimGrey: 'var(--color-pashaDimGrey)',
        pashaBgGrey: 'var(--color-pashaBgGrey)',
        redError: 'var(--color-redError)',
        inputBackground: 'var(--color-inputBackground)',
        pashaBackground: 'var(--color-pashaBackground)',
      },
    },
  },
  plugins: [],
};
