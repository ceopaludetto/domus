import * as Yup from "yup";

export const IDSchema = Yup.object({
  id: Yup.string().required(),
});
