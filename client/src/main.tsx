import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Toaster } from "./components/ui/toaster.tsx";
import ReduxProvider from "./store/Provder.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ReduxProvider>
            <div className="text-foreground">
                <App />
            </div>
            <Toaster />
        </ReduxProvider>
    </React.StrictMode>
);
