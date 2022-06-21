import type { NavLinkProps } from "@remix-run/react";
import type { Icon } from "lucide-react";
import type { ReactNode } from "react";

import { Box, Typography } from "@mui/material";
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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        color: "secondary.main",
        textDecoration: "none",
        whiteSpace: "nowrap",
        "&.active .icon": { backgroundColor: "primary.main", color: "primary.contrastText" },
      }}
      component={NavLink}
      {...rest}
    >
      <BrandIcon
        type="contained"
        icon={icon}
        className="icon"
        sx={{ transition: (theme) => theme.transitions.create(["background-color", "color"]) }}
      />
      <Box sx={{ ml: 2, flex: 1 }}>
        <Typography sx={{ fontWeight: "regular" }}>{title}</Typography>
        <Typography variant="subtitle2" color="textSecondary" sx={{ fontWeight: "regular" }}>
          {description}
        </Typography>
      </Box>
      <Box sx={{ display: { xs: "none", lg: "flex" }, color: "text.secondary" }}>
        <ChevronRight size={18} />
      </Box>
    </Box>
  );
}

TabLink.defaultProps = {
  end: true,
};
