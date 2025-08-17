/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        'accent-red': '#dc2626',
        'accent-red-dark': '#991b1b',
        'accent-red-light': '#f87171',
        'dark-bg': '#0f0f0f',
        'dark-surface': '#1a1a1a',
        'dark-border': '#333333',
        'dark-text': '#ffffff',
        'dark-muted': '#888888',
      },
      backgroundImage: {
        'red-gradient': 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
      },
    },
  },
  plugins: [],
}
