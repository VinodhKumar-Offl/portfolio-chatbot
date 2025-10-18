/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        neon: '0 0 10px rgba(147, 51, 234, 0.7), 0 0 20px rgba(236, 72, 153, 0.5)',
        'neon-cyan': '0 0 8px #00f7ff, 0 0 12px #00f7ff',
        'neon-drawer': '0 0 15px #00f7ff',
      },
      backdropBlur: {
        '4xl': '32px', // Extra strong blur
      },
      scrollBehavior: ["responsive"],
    },
  },
  plugins: [],
};