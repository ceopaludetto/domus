import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const SigninSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});

export type ISigninValues = Yup.InferType<typeof SigninSchema>;
export const SigninValidator = withYup(SigninSchema);
