import { useNavigate, useActionData } from "@remix-run/react";
import { useIsomorphicLayoutEffect } from "ahooks";
import { useCallback, useState } from "react";

export type IUseFormDrawerControllerProps = {
  handleClose: () => void;
  handleTransitionEnd: () => void;
  open: boolean;
};

export function useFormDrawerController(): IUseFormDrawerControllerProps {
  const data = useActionData();
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const handleClose = useCallback(() => {
    setOpen(false);
  }, []);

  const handleTransitionEnd = useCallback(() => {
    if (!open) navigate("../", { replace: true });
  }, [open, navigate]);

  useIsomorphicLayoutEffect(() => setOpen(true), []);
  useIsomorphicLayoutEffect(() => {
    if (data) setOpen(false);
  }, [data]);

  return { open, handleClose, handleTransitionEnd };
}
