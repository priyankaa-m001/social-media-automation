import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// react()       -> lets Vite understand JSX/TSX and gives hot reload while coding
// tailwindcss() -> turns Tailwind classes (like "px-4") into real CSS
export default defineConfig({
    // base: GitHub Pages serves the site from /social-media-automation/, not from /
    base: "/social-media-automation/",
    plugins: [react(), tailwindcss()],
});
