import type { BoxProps } from "@mui/material";
import type { Icon } from "lucide-react";

import { alpha, Box } from "@mui/material";

export type IBrandIconProps = BoxProps & {
  icon: Icon;
  type?: "ghost" | "contained";
};

export function BrandIcon({ icon: Icon, type, sx, ...rest }: IBrandIconProps) {
  return (
    <Box
      sx={{
        p: 1,
        borderRadius: 1.5,
        display: "flex",
        ...(type === "contained"
          ? { backgroundColor: (theme) => alpha(theme.palette.secondary.main, 0.1), color: "secondary.main" }
          : { backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.2), color: "primary.main" }),
        ...sx,
      }}
      {...rest}
    >
      <Icon size={20} />
    </Box>
  );
}

BrandIcon.defaultProps = {
  type: "ghost",
};
