import type { Config } from "tailwindcss";
const withMT = require("@material-tailwind/react/utils/withMT");

const config: Config = withMT({
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": "var(--font-roboto);",
        "lato": "var(--font-lato);",
      },
      colors: {
        "text-primary": "var(--text-primary-color);",
        "primary": "var(--primary-main-color);",
        "primary-light": "var(--primary-light-color);",
        "primary-dark": "var(--primary-dark-color);",
      },
    },
  },
  plugins: [],
});

export default config;
