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
      open: false,
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@config": path.resolve(__dirname, "./src/config"),
      "@core": path.resolve(__dirname, "./src/core"),
      "@services": path.resolve(__dirname, "./src/services"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@cards": path.resolve(__dirname, "./src/presentation/components/cards"),
      "@modals": path.resolve(
        __dirname,
        "./src/presentation/components/modals",
      ),
      "@selects": path.resolve(
        __dirname,
        "./src/presentation/components/selects",
      ),
      "@empty-states": path.resolve(
        __dirname,
        "./src/presentation/components/empty-states",
      ),
      "@forms": path.resolve(__dirname, "./src/presentation/components/forms"),
      "@global": path.resolve(__dirname, "./src/presentation/global"),
      "@assets": path.resolve(__dirname, "./src/presentation/assets"),
      "@hooks": path.resolve(__dirname, "./src/presentation/hooks"),
      "@ui": path.resolve(__dirname, "./src/presentation/components/ui"),
      "@common": path.resolve(
        __dirname,
        "./src/presentation/components/common",
      ),
      "@components": path.resolve(__dirname, "./src/presentation/components"),
      "@presentation": path.resolve(__dirname, "./src/presentation"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    manifest: "terser",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("lodash")) return "lodash";
            if (id.includes("recharts")) return "recharts";
            if (id.includes("framer-motion")) return "motion";
          }
        },
      },
    },
  },
});
