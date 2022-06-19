import type { BoxProps } from "@mui/material";
import type { ReactElement, ReactNode } from "react";

import { IconButton, Grid, Box, Typography } from "@mui/material";
import { Menu } from "lucide-react";
import { useCallback } from "react";

import { Conditional } from "../atoms";

import { useSidebarContext } from "~/providers/sidebar";

export type IPageProps = BoxProps & {
  isSubPage?: boolean;
  subPage?: ReactElement<IPageProps>;
  subtitle: ReactNode;
  title: ReactNode;
  trailing?: ReactNode;
};

export function Page({ title, subtitle, children, trailing, subPage, isSubPage, sx, ...rest }: IPageProps) {
  const { open, toggleSidebar } = useSidebarContext();

  const Wrapper = useCallback(
    (c: JSX.Element) => <Box sx={{ gridArea: "page", display: "flex", flexWrap: "wrap" }}>{c}</Box>,
    []
  );

  return (
    <Conditional condition={!!subPage} wrap={Wrapper}>
      <>
        <Box
          sx={{
            px: 3,
            pt: 3,
            pb: { xs: subPage ? 0 : 3, lg: 3 },
            minHeight: { lg: "100vh" },
            borderLeft: isSubPage ? { lg: 1 } : 0,
            borderColor: { lg: "divider" },
            flex: { xs: "0 0 100%", lg: isSubPage ? 1.5 : 1 },
            gridArea: !subPage ? "page" : undefined,
            overflowY: "auto",
            maxHeight: { lg: "100vh" },
            ...sx,
          }}
          {...rest}
        >
          <Grid sx={{ mb: 2 }} container spacing={2} alignItems="center">
            {!isSubPage && (
              <Grid item sx={{ display: { xs: "block", md: "none" } }}>
                <IconButton aria-label={open ? "Fechar Menu" : "Abrir Menu"} onClick={() => toggleSidebar()}>
                  <Menu />
                </IconButton>
              </Grid>
            )}
            <Grid xs item sx={{ display: { xs: isSubPage ? "none" : "block", lg: "block" } }}>
              <Typography variant="h4" component="h1">
                {title}
              </Typography>
              <Typography variant="subtitle1" sx={{ fontWeight: "medium" }} component="h2" color="primary">
                {subtitle}
              </Typography>
            </Grid>
            {!!trailing && <Grid item>{trailing}</Grid>}
          </Grid>
          {children}
        </Box>
        {subPage}
      </>
    </Conditional>
  );
}

Page.defaultProps = {
  trailing: undefined,
  subPage: undefined,
  isSubPage: false,
};
