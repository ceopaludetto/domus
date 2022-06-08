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
      PaperProps={{
        elevation: 0,
        sx: { p: 3, borderLeft: 1, borderColor: "divider", ...PaperProps?.sx },
        ...PaperProps,
      }}
      onClose={handleClose}
      open={open}
      variant="temporary"
      anchor="right"
      ModalProps={{
        keepMounted: true,
        // disablePortal: true,
        onTransitionEnd: handleTransitionEnd,
        ...ModalProps,
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
