import type { LoadingButtonProps } from "@mui/lab";

import { LoadingButton } from "@mui/lab";
import { useIsSubmitting } from "remix-validated-form";

export type ISubmitButtonProps = LoadingButtonProps & {
  formId?: string;
};

export function SubmitButton({ formId, loading, children, ...rest }: ISubmitButtonProps) {
  const isSubmitting = useIsSubmitting(formId);

  return (
    <LoadingButton loading={isSubmitting ?? loading} {...rest}>
      {children}
    </LoadingButton>
  );
}

SubmitButton.defaultProps = {
  formId: undefined,
  type: "submit",
};
