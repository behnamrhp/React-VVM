import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      include: ["src/"],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, "src/index.ts"),
      name: "reactvvm",
      formats: ["es", "umd"],
      fileName: (format) => `reactvvm.${format}.js`,
    },
    rollupOptions: {
<<<<<<< HEAD
      external: ["react", "react-dom", "react/jsx-runtime"],
=======
      external: [
        "react",
        "react-dom",
        "react/jsx-runtime",
        "react/jsx-dev-runtime",
      ],
>>>>>>> b5bfe25b3d1bacd3e56a009aff4ef25345affe3b
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "jsxRuntime",
          "react/jsx-dev-runtime": "jsxDevRuntime",
        },
      },
    },
    sourcemap: true,
    emptyOutDir: true,
  },
});
