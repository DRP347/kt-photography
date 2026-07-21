import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-soft": "var(--paper-soft)",
        "paper-deep": "var(--paper-deep)",
        ink: "var(--ink)",
        "ink-soft": "var(--ink-soft)",
        muted: "var(--muted)",
        line: "var(--line)",
        "line-soft": "var(--line-soft)",
        champagne: "var(--champagne)",
        "champagne-dark": "var(--champagne-dark)",
        "warm-white": "var(--warm-white)",
        night: "var(--night)",
        "night-soft": "var(--night-soft)",
        "night-line": "var(--night-line)",
        "night-text": "var(--night-text)",
        "night-muted": "var(--night-muted)",
        "night-accent": "var(--night-accent)"
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-ui)"]
      }
    }
  },
  plugins: []
};

export default config;
