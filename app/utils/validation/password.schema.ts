import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const PasswordSchema = Yup.object({
  currentPassword: Yup.string().required(),
  newPassword: Yup.string().required(),
  repeatNewPassword: Yup.string()
    .oneOf([null, Yup.ref("newPassword")], "As senhas não condizem")
    .required(),
});

export type IPasswordValues = Yup.InferType<typeof PasswordSchema>;
export const PasswordValidator = withYup(PasswordSchema);
