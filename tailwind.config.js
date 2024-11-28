/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // Custom blue color
        secondary: "#9333EA", // Custom purple color
        accent: {
          light: "#FDE68A", // Custom yellow (light shade)
          DEFAULT: "#F59E0B", // Default custom orange
          dark: "#D97706", // Darker orange
        },
      },
    },
  },
  plugins: [],
};
