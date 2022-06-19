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
    <Stack direction="row" spacing={2} alignItems="center" {...rest}>
      <BrandIcon icon={icon} />
      <Stack sx={{ flex: 1 }}>
        <Typography variant="h5" component={useSemanticTags ? "h1" : "p"}>
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
