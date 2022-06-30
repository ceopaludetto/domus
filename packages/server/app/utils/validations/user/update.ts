import * as Yup from "yup";

export const UpdateUserSchema = Yup.object({
  birthDate: Yup.date(),
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string(),
});
