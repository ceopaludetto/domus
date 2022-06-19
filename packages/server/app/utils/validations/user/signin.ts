import * as Yup from "yup";

export const SigninSchema = Yup.object({
  email: Yup.string().email().required(),
  password: Yup.string().required(),
});
