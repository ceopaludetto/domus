import type { ITabLinkProps } from "./tab-link";
import type { BoxProps } from "@mui/material";
import type { ReactElement } from "react";

import { Box } from "@mui/material";

export type ITabLinkGroupProps = BoxProps & {
  children: ReactElement<ITabLinkProps>[];
};

export function TabLinkGroup({ children, ...rest }: ITabLinkGroupProps) {
  return (
    <Box
      sx={{ display: "flex", flexDirection: { xs: "row", lg: "column" }, gap: 3, overflowX: "auto", width: "100%" }}
      {...rest}
    >
      {children}
    </Box>
  );
}
