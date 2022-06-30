import type { BoxProps } from "@mui/material";
import type { Icon } from "lucide-react";

import { Box } from "@mui/material";

export type IBrandIconProps = BoxProps & {
  icon: Icon;
  type?: "ghost" | "contained";
};

export function BrandIcon({ icon: Icon, type, sx, ...rest }: IBrandIconProps) {
  const color = type === "contained" ? "secondary" : "primary";
  const opacity = type === "contained" ? 0.1 : 0.2;

  return (
    <Box
      sx={{
        backgroundColor: (theme) => `rgba(${theme.vars.palette[color].mainChannel} / ${opacity})`,
        borderRadius: 1.5,
        color: `${color}.main`,
        display: "flex",
        p: 1,
        ...sx,
      }}
      {...rest}
    >
      <Icon aria-hidden="true" size={20} />
    </Box>
  );
}

BrandIcon.defaultProps = {
  type: "ghost",
};
