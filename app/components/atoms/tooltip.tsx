import { Tooltip as MuiTooltip, tooltipClasses, styled } from "@mui/material";

export const Tooltip = styled<typeof MuiTooltip>(({ className, ...properties }) => (
  <MuiTooltip {...properties} classes={{ popper: className, ...properties.classes }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    fontSize: theme.typography.pxToRem(12),
  },
}));
