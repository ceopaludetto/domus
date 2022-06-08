import { RemixBrowser } from "@remix-run/react";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { ApplicationCacheProvider, ApplicationThemeProvider } from "./providers/theme";

const isDark = window.matchMedia("(prefers-color-scheme: dark)");
const initialColorMode = isDark ? "dark" : "light";

hydrateRoot(
  document,
  <StrictMode>
    <ApplicationCacheProvider>
      <ApplicationThemeProvider initialColorMode={initialColorMode}>
        <RemixBrowser />
      </ApplicationThemeProvider>
    </ApplicationCacheProvider>
  </StrictMode>
);
