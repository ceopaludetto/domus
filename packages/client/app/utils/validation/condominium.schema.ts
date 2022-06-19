import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const CondominiumSchema = Yup.object({
  name: Yup.string().required(),
  character: Yup.string().length(1).required(),
});

export type ICondominiumValues = Yup.InferType<typeof CondominiumSchema>;
export const CondominiumValidator = withYup(CondominiumSchema);
