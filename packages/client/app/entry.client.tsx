import { RemixBrowser } from "@remix-run/react";
import { StrictMode } from "react";
import { hydrateRoot } from "react-dom/client";

import { ApplicationCacheProvider, ApplicationThemeProvider } from "./providers/theme";

hydrateRoot(
  document,
  <StrictMode>
    <ApplicationCacheProvider>
      <ApplicationThemeProvider>
        <RemixBrowser />
      </ApplicationThemeProvider>
    </ApplicationCacheProvider>
  </StrictMode>
);
