import type { Condominium } from "@prisma/client";

import { withClient } from "~/utils/api.server";

export const getCondominiumByID = withClient(async (client, id: Condominium["id"]) =>
  client.query("condominiums.findByID", { id })
);

export const getUserCondominiums = withClient(async (client) => client.query("condominiums.findByUserID"));
