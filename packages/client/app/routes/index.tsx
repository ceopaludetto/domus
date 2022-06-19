import type { Condominium } from "@prisma/client";
import type { LoaderFunction } from "@remix-run/node";

import { Link as MuiLink } from "@mui/material";
import { json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import { getUserCondominiums } from "~/models";
import { getUserID } from "~/utils/session.server";

export const loader: LoaderFunction = async ({ request }) => {
  const id = await getUserID(request);
  if (!id) return json(null);

  const condominiums = await getUserCondominiums({ request });
  const defaultCondominium = condominiums[0];

  return json(defaultCondominium);
};

export default function Index() {
  const condominium = useLoaderData<Condominium | null>();

  return (
    <MuiLink component={Link} to={condominium?.id ?? "/authentication/signin"}>
      {condominium ? "Dashboard" : "Entrar"}
    </MuiLink>
  );
}
