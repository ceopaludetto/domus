import type { NavLinkProps } from "@remix-run/react";
import type { Icon } from "lucide-react";
import type { ReactNode } from "react";

import { ButtonBase, Typography } from "@mui/material";
import { NavLink } from "@remix-run/react";

import { BrandIcon } from "../atoms";

export type ISidebarLinkProps = Omit<NavLinkProps, "className" | "style" | "children"> & {
  children: ReactNode;
  icon: Icon;
};

export function SidebarLink({ children, icon, ...rest }: ISidebarLinkProps) {
  return (
    <ButtonBase
      focusRipple
      component={NavLink}
      sx={{
        "&.active": {
          backgroundColor: (theme) => `rgba(${theme.vars.palette.primary.mainChannel} / 0.15)`,
          color: "primary.main",
        },
        borderRadius: 1.5,
        display: "inline-flex",
        justifyContent: "flex-start",
        p: 1.25,
        transition: (theme) => theme.transitions.create(["color", "background-color"]),
        width: "100%",
      }}
      {...rest}
    >
      <BrandIcon icon={icon} />
      <Typography sx={{ fontWeight: "medium", ml: 2 }}>{children}</Typography>
    </ButtonBase>
  );
}

SidebarLink.defaultProps = {
  end: true,
};
