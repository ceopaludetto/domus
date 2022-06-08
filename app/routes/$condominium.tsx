import type { User, Condominium } from "@prisma/client";
import type { ActionFunction, LoaderFunction } from "@remix-run/node";

import { Box } from "@mui/material";
import { json } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";

import { Sidebar } from "~/components";
import { getUserCondominiums } from "~/models";
import { SidebarProvider } from "~/providers/sidebar";
import { logout, requireUser } from "~/utils/session.server";

type LoaderData = { condominiums: Condominium[]; user: User };

export const loader: LoaderFunction = async ({ request }) => {
  const user = await requireUser(request);
  const condominiums = await getUserCondominiums(user.id);

  return json<LoaderData>({ user, condominiums });
};

export const action: ActionFunction = async ({ request }) => {
  const data = await request.formData();
  const subaction = data.get("subaction");

  if (subaction === "logout") return logout(request);
  return json(null);
};

export default function Dashboard() {
  const { user, condominiums } = useLoaderData<LoaderData>();

  return (
    <SidebarProvider>
      <Box
        sx={{
          display: "grid",
          gridTemplateAreas: `"sidebar page"`,
          gridTemplateColumns: { xs: "auto 1fr", md: "350px 1fr" },
          gridTemplateRows: "1fr",
        }}
      >
        <Sidebar user={user} condominiums={condominiums} />
        <Outlet />
      </Box>
    </SidebarProvider>
  );
}
