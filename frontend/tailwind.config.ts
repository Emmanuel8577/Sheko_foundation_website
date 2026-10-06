import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: "#8B72DE",       // Exact soft purple from screenshot
          primaryHover: "#775CD4",  // Slightly darker tone for hover states
          lightBg: "#F8F7FD",       // Subtle background matching light themes
          darkText: "#1F1B2D",      // Deep charcoal/navy for typography
        },
      },
    },
  },
  plugins: [],
};

export default config;