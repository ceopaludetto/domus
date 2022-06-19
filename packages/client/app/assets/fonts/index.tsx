import { GlobalStyles } from "@mui/material";

import Poppins300Woff from "./poppins-v20-latin-300.woff";
import Poppins300Woff2 from "./poppins-v20-latin-300.woff2";
import Poppins400Woff from "./poppins-v20-latin-400.woff";
import Poppins400Woff2 from "./poppins-v20-latin-400.woff2";
import Poppins500Woff from "./poppins-v20-latin-500.woff";
import Poppins500Woff2 from "./poppins-v20-latin-500.woff2";
import Poppins700Woff from "./poppins-v20-latin-700.woff";
import Poppins700Woff2 from "./poppins-v20-latin-700.woff2";

export function Fonts() {
  return (
    <GlobalStyles
      styles={[
        {
          "@font-face": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 300,
            fontDisplay: "swap",
            src: `url('${Poppins300Woff2}') format('woff2'), url('${Poppins300Woff}') format('woff')`,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 400,
            fontDisplay: "swap",
            src: `url('${Poppins400Woff2}') format('woff2'), url('${Poppins400Woff}') format('woff')`,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 500,
            fontDisplay: "swap",
            src: `url('${Poppins500Woff2}') format('woff2'), url('${Poppins500Woff}') format('woff')`,
          },
        },
        {
          "@font-face": {
            fontFamily: "Poppins",
            fontStyle: "normal",
            fontWeight: 700,
            fontDisplay: "swap",
            src: `url('${Poppins700Woff2}') format('woff2'), url('${Poppins700Woff}') format('woff')`,
          },
        },
      ]}
    />
  );
}
