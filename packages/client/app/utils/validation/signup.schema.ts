import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const SignupSchema = Yup.object({
  condominiumName: Yup.string(),
  email: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.email().required(),
  }),
  firstName: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.required(),
  }),
  lastName: Yup.string().when("step", {
    is: 0,
    then: (schema) => schema.required(),
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
  step: Yup.number(),
});

export type ISignupValues = Yup.InferType<typeof SignupSchema>;
export const SignupValidator = withYup(SignupSchema);
