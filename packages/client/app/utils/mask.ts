import type { AnyMaskedOptions } from "imask";

import { date } from "@domus/utils";
import IMask from "imask";

export const PHONE: AnyMaskedOptions = {
  mask: [
    { definitions: { "@": /[1-9]/ }, mask: "(@@) 0000-0000" },
    { definitions: { "#": /9/, "@": /[1-9]/ }, mask: "(@@) #0000-0000" },
  ],
};

export const DATE: AnyMaskedOptions = {
  blocks: {
    DD: {
      from: 1,
      mask: IMask.MaskedRange,
      to: 31,
    },
    MM: {
      from: 1,
      mask: IMask.MaskedRange,
      to: 12,
    },
    YYYY: {
      from: 1970,
      mask: IMask.MaskedRange,
      to: 2030,
    },
  },
  format: (value) => date(value).format("DD/MM/YYYY"),
  mask: Date,
  max: new Date(),
  parse: (value) => date(value, "DD/MM/YYYY").toDate(),
  pattern: "DD/MM/YYYY",
};
