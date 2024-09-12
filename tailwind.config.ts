import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Source Sans 3", "sans-serif"],
    },
    extend: {
      colors: {
        patreon: "#f96854",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
export default config
