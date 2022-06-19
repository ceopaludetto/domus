import { createRouter } from "~/middlewares";
import { prisma } from "~/utils/database";
import { IDSchema } from "~/utils/validations";

export const condominiums = createRouter()
  .query("findByID", {
    input: IDSchema,
    meta: { hasAuth: true },
    resolve: async ({ input: { id } }) => prisma.condominium.findUnique({ where: { id } }),
  })
  .query("findByUserID", {
    meta: { hasAuth: true },
    resolve: async ({ ctx }) => prisma.condominium.findMany({ where: { users: { some: { userID: ctx.user.id } } } }),
  });
