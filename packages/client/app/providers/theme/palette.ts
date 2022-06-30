import type { PaletteOptions } from "@mui/material";

export const darkPalette: PaletteOptions = {
  background: {
    default: "#000",
    paper: "#0d0d0d",
  },
  divider: "rgba(255,255,255,0.09)",
  error: {
    main: "#f87171",
  },
  mode: "dark",
  primary: {
    main: "#a78bfa",
  },
  secondary: {
    main: "#FFF",
  },
  success: {
    main: "#c2eaba",
  },
  warning: {
    main: "#fde047",
  },
};

export const lightPalette: PaletteOptions = {
  background: {
    default: "#FFF",
    paper: "#fcfaff",
  },
  divider: "rgba(0,0,0,0.06)",
  error: {
    main: "#dc2626",
  },
  mode: "light",
  primary: {
    main: "#7c3aed",
  },
  secondary: {
    main: "#000",
  },
  success: {
    main: "#5aa94a",
  },
  warning: {
    main: "#facc15",
  },
};
