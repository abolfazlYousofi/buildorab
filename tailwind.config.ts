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
        primary: {
          DEFAULT: "#0A192F",
          light: "#1A365D",
          dark: "#050D1A",
        },
        accent: {
          DEFAULT: "#C9A84C",
          hover: "#B8923F",
          light: "#E5C878",
        },
        background: "#F8FAFC",
        foreground: "#1A202C",
        muted: "#64748B",
        border: "#E2E8F0",
      },
      fontFamily: {
        heading: ["var(--font-poppins)", "sans-serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        soft: "0 4px 20px rgba(0, 0, 0, 0.06)",
        medium: "0 8px 30px rgba(0, 0, 0, 0.1)",
        strong: "0 12px 40px rgba(0, 0, 0, 0.15)",
      },
      borderRadius: {
        DEFAULT: "8px",
        lg: "12px",
        xl: "16px",
      },
    },
  },
  plugins: [],
};

export default config;