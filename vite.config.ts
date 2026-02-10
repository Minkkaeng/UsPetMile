import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { reactClickToComponent } from "vite-plugin-react-click-to-component";

export default defineConfig(({ mode }) => {
  const isDev = mode === "development";

  return {
    plugins: [react(), isDev && reactClickToComponent()].filter(Boolean),
    base: mode === "production" ? "/UsPetMile/" : "/",
  };
});
