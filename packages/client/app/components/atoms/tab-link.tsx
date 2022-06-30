import type { NavLinkProps } from "@remix-run/react";
import type { Icon } from "lucide-react";
import type { ReactNode } from "react";

import { Box, ButtonBase, Typography } from "@mui/material";
import { NavLink } from "@remix-run/react";
import { ChevronRight } from "lucide-react";

import { BrandIcon } from "./brand-icon";

export type ITabLinkProps = Omit<NavLinkProps, "style" | "className"> & {
  description: ReactNode;
  icon: Icon;
  title: ReactNode;
};

export function TabLink({ title, description, icon, ...rest }: ITabLinkProps) {
  return (
    <ButtonBase
      disableTouchRipple
      focusRipple
      component={NavLink}
      sx={{
        "&.active .icon": { backgroundColor: "primary.main", color: "primary.contrastText" },
        alignItems: "center",
        color: "secondary.main",
        display: "flex",
        textDecoration: "none",
        whiteSpace: "nowrap",
      }}
      {...rest}
    >
      <BrandIcon
        className="icon"
        icon={icon}
        sx={{ transition: (theme) => theme.transitions.create(["background-color", "color"]) }}
        type="contained"
      />
      <Box sx={{ flex: 1, ml: 2 }}>
        <Typography sx={{ fontWeight: "regular" }}>{title}</Typography>
        <Typography color="textSecondary" sx={{ fontWeight: "regular" }} variant="subtitle2">
          {description}
        </Typography>
      </Box>
      <Box sx={{ color: "text.secondary", display: { lg: "flex", xs: "none" } }}>
        <ChevronRight size={18} />
      </Box>
    </ButtonBase>
  );
}

TabLink.defaultProps = {
  end: true,
};
