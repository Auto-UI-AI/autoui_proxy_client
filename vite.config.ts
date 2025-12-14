import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss(), cssInjectedByJsPlugin()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@app": path.resolve(__dirname, "./src/app"),
            "@entities": path.resolve(__dirname, "./src/entities"),
            "@features": path.resolve(__dirname, "./src/features"),
            "@pages": path.resolve(__dirname, "./src/pages"),
            "@shared": path.resolve(__dirname, "./src/shared"),
            "@widgets": path.resolve(__dirname, "./src/widgets"),
        },
    },

    build: {
        lib: {
            entry: path.resolve(__dirname, "./src/lib/index.js"),
            name: "@packs/campaign-manager",
            fileName: (format) => {
                if (format === "es") {
                    return `index.js`;
                }
                return `index.cjs`;
            },
        },
        rollupOptions: {
            treeshake: true,
        },
    },
});
