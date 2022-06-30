import { Box, ButtonBase, Typography } from "@mui/material";
import { Building2, ChevronsUpDown } from "lucide-react";

import { BrandIcon } from "../atoms";

export function SidebarCondominium() {
  return (
    <ButtonBase
      focusRipple
      sx={{
        alignItems: "center",
        borderRadius: 1,
        display: "flex",
        p: 1,
        textAlign: "left",
      }}
    >
      <BrandIcon icon={Building2} type="contained" />
      <Box sx={{ flex: 1, px: 2 }}>
        <Typography sx={{ fontWeight: "medium" }}>Edifício Itália</Typography>
        <Typography color="textSecondary" variant="subtitle2">
          Síndico
        </Typography>
      </Box>
      <Typography color="textSecondary" sx={{ display: "inline-flex" }}>
        <ChevronsUpDown aria-hidden="true" size={18} />
      </Typography>
    </ButtonBase>
  );
}
