import { Box, ButtonBase, Typography } from "@mui/material";
import { Building2, ChevronsUpDown } from "lucide-react";

import { BrandIcon } from "../atoms";

export function SidebarCondominium() {
  return (
    <ButtonBase sx={{ display: "flex", alignItems: "center", p: 1, borderRadius: 1, textAlign: "left" }}>
      <BrandIcon icon={Building2} type="contained" />
      <Box sx={{ flex: 1, px: 2 }}>
        <Typography sx={{ fontWeight: "medium" }}>Edifício Itália</Typography>
        <Typography variant="subtitle2" color="textSecondary">
          Síndico
        </Typography>
      </Box>
      <Typography color="textSecondary" sx={{ display: "inline-flex" }}>
        <ChevronsUpDown size={18} />
      </Typography>
    </ButtonBase>
  );
}
