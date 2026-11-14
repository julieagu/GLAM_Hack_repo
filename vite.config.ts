import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig(({ mode }) => ({
  // GitHub Pages serves the site at /GLAM_Hack_repo/; local dev stays at /.
  // `--mode pages` works in every shell (PowerShell can't do `VAR=x cmd`).
  base: mode === "pages" || process.env.GITHUB_PAGES ? "/GLAM_Hack_repo/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  server: { port: 5173 },
}));
