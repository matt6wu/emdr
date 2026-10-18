export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // Shared palette with heal /breathe: warm paper, sage, forest ink.
        brand: {
          50: "#edf1e7", 100: "#e2e9d7", 200: "#d0ddbf",
          300: "#b6c8a4", 400: "#95ad88", 500: "#78966d",
          600: "#587951", 700: "#345b49", 800: "#2a5143",
          900: "#234c43", 950: "#183b33"
        },
        stone: {
          50: "#f5f4ed", 100: "#eeeee5", 200: "#dce3d9",
          300: "#c4cfbf", 400: "#899883", 500: "#6f806c",
          600: "#5d715f", 700: "#49634f", 800: "#34533e",
          900: "#234c43", 950: "#183b33"
        }
      },
      animation: {
        "dot-glide": "dot-glide 4.5s ease-in-out infinite",
        "breathe": "breathe 8s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out both",
        "pop": "pop 0.45s ease-out both"
      },
      keyframes: {
        "dot-glide": {
          "0%, 100%": { left: "8%", transform: "translateY(-50%)" },
          "50%": { left: "calc(92% - 2.5rem)", transform: "translateY(-50%)" }
        },
        "breathe": {
          "0%, 100%": { transform: "scale(1)", opacity: "0.65" },
          "50%": { transform: "scale(1.28)", opacity: "1" }
        },
        "fade-in-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" }
        },
        "pop": {
          from: { opacity: "0", transform: "scale(1.4)" },
          to: { opacity: "1", transform: "scale(1)" }
        }
      }
    },
  },
  plugins: [],
};
