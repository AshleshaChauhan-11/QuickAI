import { ClerkProvider } from "@clerk/react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import "./index.css";
import { ThemeProvider } from "./context/ThemeContext";

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Clerk Publishable Key");
}

createRoot(document.getElementById("root")).render(

  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

    <BrowserRouter>

      <ThemeProvider>

        <App />

      </ThemeProvider>

    </BrowserRouter>

  </ClerkProvider>

);