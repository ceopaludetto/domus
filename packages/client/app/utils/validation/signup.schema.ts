import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const SignupSchema = Yup.object({
  step: Yup.number(),
  firstName: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.required(),
  }),
  lastName: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.required(),
  }),
  email: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.email().required(),
  }),
  password: Yup.string().when("step", {
    is: 1,
    then: (schema) =>
      schema.matches(/[A-Z]/, "Pelo menos uma letra maiúscula").matches(/\d/, "Pelo menos um número").required(),
  }),
  repeatPassword: Yup.string().when("step", {
    is: 1,
    then: (schema) => schema.oneOf([null, Yup.ref("password")], "As senhas não condizem").required(),
  }),
  condominiumName: Yup.string(),
});

export type ISignupValues = Yup.InferType<typeof SignupSchema>;
export const SignupValidator = withYup(SignupSchema);
