import type { AnyMaskedOptions } from "imask";

import { date } from "@domus/utils";
import IMask from "imask";

export const PHONE: AnyMaskedOptions = {
  mask: [
    { mask: "(@@) 0000-0000", definitions: { "@": /[1-9]/ } },
    { mask: "(@@) #0000-0000", definitions: { "#": /9/, "@": /[1-9]/ } },
  ],
};

export const DATE: AnyMaskedOptions = {
  mask: Date,
  pattern: "DD/MM/YYYY",
  format: (value) => date(value).format("DD/MM/YYYY"),
  parse: (value) => date(value, "DD/MM/YYYY").toDate(),
  max: new Date(),
  blocks: {
    YYYY: {
      mask: IMask.MaskedRange,
      from: 1970,
      to: 2030,
    },
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    DD: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 31,
    },
  },
};
