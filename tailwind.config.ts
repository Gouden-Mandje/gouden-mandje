import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FBF8F3",
        beige: "#F2EBDF",
        sand: "#E7DDCD",
        ink: "#3D2E22",
        taupe: "#8A745F",
        gold: "#C69A5B",
        clay: "#D98E4F",
      },
    },
  },
  plugins: [],
};

export default config;
