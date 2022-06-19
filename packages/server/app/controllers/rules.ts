import { createRouter } from "~/middlewares";
import { prisma } from "~/utils/database";
import { IDSchema } from "~/utils/validations";

export const rules = createRouter()
  .query("findByID", {
    input: IDSchema,
    meta: { hasAuth: true },
    resolve: async ({ input: { id } }) => prisma.rule.findUnique({ where: { id } }),
  })
  .query("findByCondominiumID", {
    meta: { hasAuth: true, hasCondominium: true },
    resolve: async ({ ctx }) => prisma.rule.findMany({ where: { condominiumID: ctx.condominium.id } }),
  });
