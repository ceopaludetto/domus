import type { Condominium, User } from "@prisma/client";

import { client } from "~/utils/api.server";

export async function getCondominiumByID(id: Condominium["id"]) {
  return client.query("condominiums.findByID", { id });
}

export async function getUserCondominiums(id: User["id"]) {
  return client.query("condominiums.findUserCondominiums", { id });
}
