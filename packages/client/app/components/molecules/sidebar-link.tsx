import type { NavLinkProps } from "@remix-run/react";
import type { Icon } from "lucide-react";
import type { ReactNode } from "react";

import { alpha, ButtonBase, Typography } from "@mui/material";
import { NavLink } from "@remix-run/react";

import { BrandIcon } from "../atoms";

export type ISidebarLinkProps = Omit<NavLinkProps, "className" | "style" | "children"> & {
  children: ReactNode;
  icon: Icon;
};

export function SidebarLink({ children, icon, ...rest }: ISidebarLinkProps) {
  return (
    <ButtonBase
      sx={{
        borderRadius: 1.5,
        width: "100%",
        p: 1.25,
        display: "inline-flex",
        justifyContent: "flex-start",
        transition: (theme) => theme.transitions.create(["color", "background-color"]),
        "&.active": { color: "primary.main", backgroundColor: (theme) => alpha(theme.palette.primary.main, 0.15) },
      }}
      component={NavLink}
      {...rest}
    >
      <BrandIcon icon={icon} />
      <Typography sx={{ ml: 2, fontWeight: "medium" }}>{children}</Typography>
    </ButtonBase>
  );
}

SidebarLink.defaultProps = {
  end: true,
};
