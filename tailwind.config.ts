import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/app/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {

      colors: {
        primary: "#1A3C34",
        background: "#F7F6F3",
        card: "#F1ECE5",
        border: "#E6E1DA",
        muted: "#6B6B6B",
      },

      fontFamily: {
        body: ["var(--font-body)"],
        heading: ["var(--font-heading)"],
      },

      container: {
        center: true,
        padding: "24px",
        screens: {
          xl: "1280px",
        },
      },

      borderRadius: {
        xl: "28px",
        lg: "20px",
        md: "14px",
      },

      boxShadow: {
        card: "0px 10px 30px rgba(0,0,0,0.06)",
      },

    },
  },
  plugins: [],
};

export default config;