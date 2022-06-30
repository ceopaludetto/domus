import type { DrawerProps } from "@mui/material";
import type { IUseFormDrawerControllerProps } from "~/utils/hooks";

import { Drawer } from "@mui/material";

export type IFormDrawerProps = DrawerProps &
  IUseFormDrawerControllerProps & {
    size?: number;
  };

export function FormDrawer({
  open,
  handleClose,
  handleTransitionEnd,
  size,
  children,
  PaperProps,
  ModalProps,
  ...rest
}: IFormDrawerProps) {
  return (
    <Drawer
      anchor="right"
      onClose={handleClose}
      open={open}
      variant="temporary"
      ModalProps={{
        keepMounted: true,
        // disablePortal: true,
        onTransitionEnd: handleTransitionEnd,
        ...ModalProps,
      }}
      PaperProps={{
        elevation: 0,
        sx: {
          borderColor: "divider",
          borderLeft: 1,
          p: 3,
          ...PaperProps?.sx,
        },
        ...PaperProps,
      }}
      {...rest}
    >
      {children}
    </Drawer>
  );
}

FormDrawer.defaultProps = {
  size: 500,
};
