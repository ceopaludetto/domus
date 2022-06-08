import type { ReactNode } from "react";
import type { ColorMode } from "~/utils/types";

import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useIsomorphicLayoutEffect } from "ahooks";
import { useState } from "react";

import { createApplicationTheme } from "./create";

interface IApplicationThemeProviderProperties {
  children: ReactNode;
  initialColorMode: ColorMode;
}

export function ApplicationThemeProvider({ children, initialColorMode }: IApplicationThemeProviderProperties) {
  const [currentTheme, setCurrentTheme] = useState(createApplicationTheme(initialColorMode));
  const isDark = useMediaQuery("(prefers-color-scheme: dark)", { defaultMatches: initialColorMode === "dark" });

  useIsomorphicLayoutEffect(() => {
    setCurrentTheme(createApplicationTheme(isDark ? "dark" : "light"));
  }, [isDark]);

  return (
    <ThemeProvider theme={currentTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export * from "./cache";
export * from "./create";
