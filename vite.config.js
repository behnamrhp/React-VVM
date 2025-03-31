import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import dts from "vite-plugin-dts";
// https://vite.dev/config/
export default defineConfig(function () { return ({
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
            entry: "./src/index.ts",
            name: "react-vvm",
            formats: ["es", "umd"],
            fileName: function (format) { return "react-vvm.".concat(format, ".js"); },
        },
        rollupOptions: {
            // Make sure these match what's in your package.json peerDependencies
            external: [
                "react",
                "react-dom",
                "react/jsx-runtime",
                "react/jsx-dev-runtime",
            ],
            output: {
                globals: {
                    react: "React",
                    "react-dom": "ReactDOM",
                    "react/jsx-runtime": "jsxRuntime",
                    "react/jsx-dev-runtime": "jsxDevRuntime",
                },
            },
        },
    },
}); });
