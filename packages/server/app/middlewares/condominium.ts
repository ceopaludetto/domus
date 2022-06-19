import type * as TRPCExpress from "@trpc/server/adapters/express";

import { prisma } from "~/utils/database";

export async function getCondominiumByHeader({ req }: TRPCExpress.CreateExpressContextOptions) {
  if (req.headers.authorization) {
    const id = req.headers.condominium;
    if (!id || Array.isArray(id)) return null;

    const condominium = await prisma.condominium.findUnique({ where: { id } });
    return condominium;
  }

  return null;
}
