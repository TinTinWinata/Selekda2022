import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
    plugins: [
        laravel(["resources/css/app.css", "resources/js/app.js"]),
        reactRefresh(),
    ],
    server: {
        watch: {
            host: "http://localhost/",
            usePolling: true,
        },
    },
});
