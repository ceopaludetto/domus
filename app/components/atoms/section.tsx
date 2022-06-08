import type { BoxProps } from "@mui/material";
import type { ReactNode } from "react";

import { Box, Grid, Typography } from "@mui/material";

export type ISectionProps = BoxProps & {
  description: ReactNode;
  title: ReactNode;
  trailing?: ReactNode;
};

export function Section({ title, description, children, sx, trailing, ...rest }: ISectionProps) {
  return (
    <Box component="section" sx={{ "& + &": { mt: 2 }, ...sx }} {...rest}>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs>
          <Typography variant="h6" component="h3" sx={{ fontWeight: "regular" }}>
            {title}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            {description}
          </Typography>
        </Grid>
        {!!trailing && <Grid item>{trailing}</Grid>}
      </Grid>
      {children}
    </Box>
  );
}

Section.defaultProps = {
  trailing: undefined,
};
