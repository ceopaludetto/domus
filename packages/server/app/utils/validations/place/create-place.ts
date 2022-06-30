import * as Yup from "yup";

export const CreatePlaceSchema = Yup.object({
  capacity: Yup.number().required(),
  name: Yup.string().required(),
});
