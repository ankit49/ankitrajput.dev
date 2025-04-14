/** @type {import('tailwindcss').Config} */
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: ["./*.{html,js}", "./*/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Noto Sans"],
      jetbrains: ["JetBrains Mono"],
      dancing: ["Dancing Script"],
    },
    extend: {
      colors: {
        primaryBg: "var(--primary-bg-color)",
        secondaryBg: "var(--secondary-bg-color)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        highlighter: "var(--highlighter-color)",
        highlighter2: "var(--highlighter-hover)",
      },
      keyframes: {
        wave: {
          "0%": { transform: "rotate(0deg)" },
          "10%": { transform: "rotate(14deg)" },
          "20%": { transform: "rotate(-8deg)" },
          "30%": { transform: "rotate(14deg)" },
          "40%": { transform: "rotate(-4deg)" },
          "50%": { transform: "rotate(10deg)" },
          "60%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(0deg)" },
        },
      },
      animation: {
        wave: "wave 2s infinite",
      },
    },
  },
  plugins: [
    plugin(function ({ addComponents }) {
      addComponents({
        ".btn-primary": {},
        ".social-cards": {
          display: "flex",
          "align-items": "center",
          "justify-content": "center",
          cursor: "pointer",
          background: "var(--secondary-bg-color)",
          height: "55px",
          width: "55px",
          "border-radius": "8px",
          "box-shadow": "6px 6px 10px -1px rgba(0, 0, 0, 0.15),-6px -6px 10px -1px rgba(255, 255, 255, 0.7)",
          border: "1px solid rgba(0, 0, 0, 0)",
          transition: "transform 0.5s",
          "& i": {
            "font-size": "30px",
            color: "var(--primary-text)",
            transition: "transform 0.5s",
          },
          "&:hover": {
            "box-shadow":
              "inset 4px 4px 6px -1px rgba(0, 0, 0, 0.2),inset -4px -4px 6px -1px rgba(255, 255, 255, 0.7),-0.5px -0.5px 0px rgba(255, 255, 255, 1),0.5px 0.5px 0px rgba(0, 0, 0, 0.15), 0px 12px 10px -10px rgba(0, 0, 0, 0.05)",
            border: "1px solid rgba(0, 0, 0, 0.01)",
            transform: "translateY(2px)",
          },
          "&:hover i": {
            transform: "scale(0.9)",
            color: "var(--highlighter-color)",
          },
        },
      });
    }),
  ],
};
