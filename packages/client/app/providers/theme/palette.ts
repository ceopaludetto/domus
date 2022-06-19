import type { Palette } from "@mui/material";
import type { DeepPartial } from "utility-types";

export const darkPalette: DeepPartial<Palette> = {
  mode: "dark",
  primary: {
    main: "#a78bfa",
  },
  secondary: {
    main: "#FFF",
  },
  error: {
    main: "#f87171",
  },
  warning: {
    main: "#fde047",
  },
  success: {
    main: "#c2eaba",
  },
  background: {
    paper: "#0d0d0d",
    default: "#000",
  },
  divider: "rgba(255,255,255,0.09)",
};

export const lightPalette: DeepPartial<Palette> = {
  mode: "light",
  primary: {
    main: "#7c3aed",
  },
  secondary: {
    main: "#000",
  },
  error: {
    main: "#dc2626",
  },
  warning: {
    main: "#facc15",
  },
  success: {
    main: "#5aa94a",
  },
  background: {
    paper: "#fcfaff",
    default: "#FFF",
  },
  divider: "rgba(0,0,0,0.06)",
};
