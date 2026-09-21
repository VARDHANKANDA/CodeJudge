/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          hover: '#E56000',
        },
        secondary: {
          DEFAULT: '#FF9933',
        },
        accent: {
          DEFAULT: '#FFD54F',
        },
        background: {
          DEFAULT: '#0F172A',
        },
        card: {
          DEFAULT: '#1E293B',
          hover: '#2D3B51',
        },
        success: {
          DEFAULT: '#22C55E',
        },
        danger: {
          DEFAULT: '#EF4444',
        },
        warning: {
          DEFAULT: '#F59E0B',
        },
        border: {
          DEFAULT: '#334155',
        }
      },
      fontFamily: {
        poppins: ['var(--font-poppins)', 'Poppins', 'sans-serif'],
        inter: ['var(--font-inter)', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
