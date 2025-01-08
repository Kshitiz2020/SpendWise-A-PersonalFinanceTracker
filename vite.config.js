import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      plugins: [resolve(), commonjs()],
    },
  },
});
