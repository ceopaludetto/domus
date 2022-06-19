import type { Palette, Theme } from "@mui/material";
import type { ColorMode } from "~/utils/types";

import { responsiveFontSizes, createTheme } from "@mui/material";

import { darkPalette, lightPalette } from "./palette";

const cache = new Map<ColorMode, Theme>();

export function createApplicationTheme(colorMode: ColorMode) {
  if (cache.has(colorMode)) return cache.get(colorMode)!;

  const radius = 2;
  const palette = (colorMode === "dark" ? darkPalette : lightPalette) as Palette;

  const theme = createTheme({
    palette,
    shape: { borderRadius: radius },
    typography: {
      fontFamily: "Poppins",
      fontWeightLight: 300,
      fontWeightRegular: 400,
      fontWeightMedium: 500,
      fontWeightBold: 700,
    },
    components: {
      MuiButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiIconButton: {
        defaultProps: {
          color: "secondary",
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          variant: "contained",
          disableElevation: true,
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "filled",
        },
      },
      MuiFilledInput: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            overflow: "hidden",
          },
          underline: {
            "&::before": { display: "none" },
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          thumb: {
            boxShadow: "none",
            width: 16,
            height: 16,
            margin: 2,
          },
          track: {
            borderRadius: 22 / 2,
          },
        },
      },
      MuiMenu: {
        styleOverrides: {
          paper: {
            maxWidth: "100%",
            width: 200,
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
        defaultProps: {
          PaperProps: { variant: "outlined", elevation: 0 },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: radius,
            paddingLeft: 8,
            paddingRight: 8,
          },
        },
      },
    },
  });

  const responsive = responsiveFontSizes(theme);

  cache.set(colorMode, responsive);
  return responsive;
}
