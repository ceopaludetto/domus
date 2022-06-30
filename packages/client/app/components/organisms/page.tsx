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
    (c: JSX.Element) => <Box sx={{ display: "flex", flexWrap: "wrap", gridArea: "page", minWidth: 0 }}>{c}</Box>,
    []
  );

  return (
    <Conditional condition={!!subPage} wrap={Wrapper}>
      <>
        <Box
          sx={{
            borderColor: { lg: "divider" },
            borderLeft: isSubPage ? { lg: 1 } : 0,
            flex: { lg: isSubPage ? 1.5 : 1, xs: "0 0 100%" },
            gridArea: !subPage ? "page" : undefined,
            maxHeight: { lg: "100vh" },
            minHeight: { lg: "100vh" },
            overflowY: "auto",
            pb: { lg: 3, xs: subPage ? 0 : 3 },
            pt: 3,
            px: 3,
            ...sx,
          }}
          {...rest}
        >
          <Grid container alignItems="center" spacing={2} sx={{ mb: 2 }}>
            {!isSubPage && (
              <Grid item sx={{ display: { md: "none", xs: "block" } }}>
                <IconButton aria-label={open ? "Fechar Menu" : "Abrir Menu"} onClick={() => toggleSidebar()}>
                  <Menu />
                </IconButton>
              </Grid>
            )}
            <Grid item xs sx={{ display: { lg: "block", xs: isSubPage ? "none" : "block" } }}>
              <Typography component="h1" variant="h4">
                {title}
              </Typography>
              <Typography color="primary" component="h2" sx={{ fontWeight: "medium" }} variant="subtitle1">
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
  isSubPage: false,
  subPage: undefined,
  trailing: undefined,
};
