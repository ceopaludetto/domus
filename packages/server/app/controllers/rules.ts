import * as TRPC from "@trpc/server";

import { prisma } from "~/utils/database";
import { IDSchema } from "~/utils/validations";

export const rules = TRPC.router()
  .query("findByID", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.rule.findUnique({ where: { id } }),
  })
  .query("findCondominiumRules", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.rule.findMany({ where: { condominiumID: id } }),
  });
