import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const PersonalInfoSchema = Yup.object({
  birthDate: Yup.string(),
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string(),
});

export type IPersonalInfoValues = Yup.InferType<typeof PersonalInfoSchema>;
export const PersonalInfoValidator = withYup(PersonalInfoSchema);
