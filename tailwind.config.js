/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Inter"],
      dancing: ["Dancing Script"],
    },
    extend: {
      colors: {
        primaryBg: "var(--primary-bg-color)",
        secondaryBg: "var(--secondary-bg-color)",
        primaryText: "var(--primary-text)",
        secondaryText: "var(--secondary-text)",
        highlighter: "var(--highlighter-color)",
        gradiantFrom: "var(--gradient-primary)",
        gradiantTo: "var(--gradient-secondary)",
      },
      boxShadow: {
        xl: "-2px -2px 4px 1px var(--primary-text)",
      },
    },
  },
  plugins: [],
};
