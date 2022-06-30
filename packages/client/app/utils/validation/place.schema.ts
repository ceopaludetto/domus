import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const PlaceSchema = Yup.object({
  capacity: Yup.number().integer().positive().typeError("Campo obrigatório").required(),
  name: Yup.string().required(),
});

export type IPlaceValues = Yup.InferType<typeof PlaceSchema>;
export const PlaceValidator = withYup(PlaceSchema);
