import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    tsconfigPaths(),
    visualizer({
      open: true,
      template: "sunburst",
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  build: {
    chunkSizeWarningLimit: 1000,
    manifest: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          const chunks = {
            lodash: /lodash/,
            motion: /framer-motion/,
          };

          for (const chunk in chunks) {
            if (chunks[chunk].test(id)) return chunk;
          }
        },
      },
    },
  },
});
