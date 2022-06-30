import type {} from "@mui/lab/themeAugmentation";
import type {} from "@mui/material/themeCssVarsAugmentation";

import { experimental_extendTheme as extendTheme } from "@mui/material";

import { darkPalette, lightPalette } from "./palette";

export function createApplicationTheme() {
  const radius = 2;

  return extendTheme({
    colorSchemes: { dark: { palette: darkPalette }, light: { palette: lightPalette } },
    components: {
      MuiButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
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
      MuiIconButton: {
        defaultProps: {
          color: "secondary",
        },
      },
      MuiLoadingButton: {
        defaultProps: {
          disableElevation: true,
          variant: "contained",
        },
        styleOverrides: {
          root: {
            textTransform: "none",
          },
        },
      },
      MuiMenu: {
        defaultProps: {
          PaperProps: { elevation: 0, variant: "outlined" },
        },
        styleOverrides: {
          paper: {
            maxWidth: "100%",
            paddingLeft: 8,
            paddingRight: 8,
            width: 200,
          },
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
      MuiSwitch: {
        styleOverrides: {
          root: {
            padding: 8,
          },
          thumb: {
            boxShadow: "none",
            height: 16,
            margin: 2,
            width: 16,
          },
          track: {
            borderRadius: 22 / 2,
          },
        },
      },
      MuiTextField: {
        defaultProps: {
          fullWidth: true,
          variant: "filled",
        },
      },
    },
    shape: { borderRadius: radius },
    typography: {
      fontFamily: "Poppins",
      fontWeightBold: 700,
      fontWeightLight: 300,
      fontWeightMedium: 500,
      fontWeightRegular: 400,
    },
  });
}
