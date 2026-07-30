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
        "dot-glide": "dot-glide 4.5s ease-in-out infinite"
      },
      keyframes: {
        "dot-glide": {
          "0%, 100%": { left: "8%", transform: "translateY(-50%)" },
          "50%": { left: "calc(92% - 2.5rem)", transform: "translateY(-50%)" }
        }
      }
    },
  },
  plugins: [],
};
