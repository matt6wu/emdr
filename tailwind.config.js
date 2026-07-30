export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 品牌色：沉静的湖水青绿，符合放松/疗愈调性
        brand: {
          50: "#f0fdfa",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#2dd4bf",
          500: "#14b8a6",
          600: "#0d9488",
          700: "#0f766e",
          800: "#115e59",
          900: "#134e4a",
          950: "#042f2e"
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
