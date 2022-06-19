import { Box } from "@mui/material";
import { Outlet } from "@remix-run/react";

export default function Authentication() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        px: 3,
      }}
    >
      <Outlet />
    </Box>
  );
}
