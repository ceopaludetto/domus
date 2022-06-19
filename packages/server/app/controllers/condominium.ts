import * as TRPC from "@trpc/server";

import { prisma } from "~/utils/database";
import { IDSchema } from "~/utils/validations";

export const condominiums = TRPC.router()
  .query("findByID", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.condominium.findUnique({ where: { id } }),
  })
  .query("findUserCondominiums", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.condominium.findMany({ where: { users: { some: { userID: id } } } }),
  });
