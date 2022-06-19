import * as Yup from "yup";

export const CreatePlaceSchema = Yup.object({
  name: Yup.string().required(),
  capacity: Yup.number().required(),
  condominiumID: Yup.string().required(),
});
