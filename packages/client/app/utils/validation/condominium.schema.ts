import { withYup } from "@remix-validated-form/with-yup";

import { Yup } from "~/utils/yup";

const CondominiumSchema = Yup.object({
  character: Yup.string().length(1).required(),
  name: Yup.string().required(),
});

export type ICondominiumValues = Yup.InferType<typeof CondominiumSchema>;
export const CondominiumValidator = withYup(CondominiumSchema);
