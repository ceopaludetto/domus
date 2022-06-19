import * as Yup from "yup";

import { IDSchema } from "../common";

export const UpdateUserSchema = Yup.object({
  email: Yup.string().email().required(),
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  phone: Yup.string(),
  birthDate: Yup.date(),
}).concat(IDSchema);
