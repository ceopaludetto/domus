import type { ReactNode } from "react";

import { CssBaseline, Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material";

import { createApplicationTheme } from "./create";

interface IApplicationThemeProviderProps {
  children: ReactNode;
}

const theme = createApplicationTheme();

export function ApplicationThemeProvider({ children }: IApplicationThemeProviderProps) {
  return (
    <CssVarsProvider defaultMode="system" prefix="" theme={theme}>
      <CssBaseline />
      {children}
    </CssVarsProvider>
  );
}

export * from "./cache";
export * from "./create";
