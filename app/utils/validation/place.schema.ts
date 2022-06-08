import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const PlaceSchema = Yup.object({
  name: Yup.string().required(),
  capacity: Yup.number().integer().positive().typeError("Campo obrigatório").required(),
});

export type IPlaceValues = Yup.InferType<typeof PlaceSchema>;
export const PlaceValidator = withYup(PlaceSchema);
