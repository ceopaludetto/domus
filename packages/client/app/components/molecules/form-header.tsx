import type { StackProps } from "@mui/material";
import type { Icon } from "lucide-react";
import type { ReactNode } from "react";

import { Stack, Typography } from "@mui/material";

import { BrandIcon } from "../atoms";

export type IFormHeaderProps = StackProps & {
  description: ReactNode;
  icon: Icon;
  title: ReactNode;
  trailing?: ReactNode;
  useSemanticTags?: boolean;
};

export function FormHeader({ icon, title, description, trailing, useSemanticTags, ...rest }: IFormHeaderProps) {
  return (
    <Stack alignItems="center" direction="row" spacing={2} {...rest}>
      <BrandIcon icon={icon} />
      <Stack sx={{ flex: 1 }}>
        <Typography component={useSemanticTags ? "h1" : "p"} variant="h5">
          {title}
        </Typography>
        <Typography color="textSecondary" component={useSemanticTags ? "h2" : "p"}>
          {description}
        </Typography>
      </Stack>
      {trailing}
    </Stack>
  );
}

FormHeader.defaultProps = {
  trailing: undefined,
  useSemanticTags: true,
};
