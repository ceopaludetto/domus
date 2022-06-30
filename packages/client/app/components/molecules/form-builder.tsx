import type { BoxProps } from "@mui/material";
import type { ReactElement } from "react";

import { Box } from "@mui/material";
import { Children } from "react";

export type IFormBuilderItemProps = BoxProps & {
  size?: number;
};

export type IFormBuilderProps = BoxProps & {
  children: ReactElement[];
};

function FormBuilderItem({ size, children, sx, ...rest }: IFormBuilderItemProps) {
  return (
    <Box sx={{ gridColumn: { md: `span ${size}`, xs: "span 12" }, ...sx }} {...rest}>
      {children}
    </Box>
  );
}

FormBuilderItem.defaultProps = {
  size: 12,
};

function isFormBuilderItem(item: ReactElement): item is ReactElement<IFormBuilderItemProps> {
  return item.type === FormBuilderItem;
}

export function FormBuilder({ children, sx, ...rest }: IFormBuilderProps) {
  return (
    <Box
      sx={{
        display: "grid",
        gap: 3,
        gridTemplateColumns: "repeat(12, 1fr)",
        ...sx,
      }}
      {...rest}
    >
      {Children.map(children, (item) => (isFormBuilderItem(item) ? item : <FormBuilderItem>{item}</FormBuilderItem>))}
    </Box>
  );
}

FormBuilder.Item = FormBuilderItem;
