import type { Place } from "@prisma/client";
import type { LoaderFunction, MetaFunction } from "@remix-run/node";

import { Box, Button, Paper, Stack } from "@mui/material";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import invariant from "tiny-invariant";

import { Page } from "~/components";
import { getCondominiumPlaces } from "~/models";

export const meta: MetaFunction = () => ({
  title: "Locais e Eventos - Domus",
});

export const loader: LoaderFunction = async ({ request, params }) => {
  const condominiumID = params.condominium;
  invariant(condominiumID, "Condominium must be setted");

  const places = await getCondominiumPlaces({ params, request });
  return json(places);
};

export default function DashboardPlaces() {
  const places = useLoaderData<Place[]>();

  return (
    <Page
      subtitle="Visão Geral"
      title="Locais e Eventos"
      trailing={
        <Stack direction="row" spacing={2}>
          <Button component={Link} to="create" variant="outlined">
            Adicionar Local
          </Button>
          <Button>Marcar Evento</Button>
        </Stack>
      }
    >
      <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: "repeat(12, 1fr)" }}>
        {places.map((place) => (
          <Box key={place.id} sx={{ gridColumn: { lg: "span 3", md: "span 4", xs: "span 12" } }}>
            <Paper sx={{ p: 2 }} variant="outlined">
              {place.name}
            </Paper>
          </Box>
        ))}
      </Box>
      <Outlet />
    </Page>
  );
}
