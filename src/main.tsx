import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Entry point: puts the React app inside <div id="root"> from index.html.
// BrowserRouter is needed so pages can change URL (/ and /login) without reloading.
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <BrowserRouter basename={import.meta.env.BASE_URL}>
            <App />
        </BrowserRouter>
    </StrictMode>
);
