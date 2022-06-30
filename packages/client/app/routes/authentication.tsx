import { Box } from "@mui/material";
import { Outlet } from "@remix-run/react";

export default function Authentication() {
  return (
    <Box
      sx={{
        alignItems: "center",
        display: "flex",
        height: "100vh",
        justifyContent: "center",
        px: 3,
      }}
    >
      <Outlet />
    </Box>
  );
}
