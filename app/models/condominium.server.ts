import type { Condominium, User } from "@prisma/client";

import { prisma } from "~/utils/database.server";

export async function getCondominiumByID(id: Condominium["id"]) {
  return prisma.condominium.findUnique({ where: { id } });
}

export async function getUserCondominiums(userID: User["id"]) {
  return prisma.condominium.findMany({ where: { users: { some: { userID } } } });
}
