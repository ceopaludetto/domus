import { createRouter } from "~/middlewares";
import { prisma } from "~/utils/database";
import { IDSchema, CreatePlaceSchema } from "~/utils/validations";

export const places = createRouter()
  .query("findByID", {
    input: IDSchema,
    meta: { hasAuth: true },
    resolve: async ({ input: { id } }) => prisma.place.findUnique({ where: { id } }),
  })
  .query("findByCondominiumID", {
    meta: { hasAuth: true, hasCondominium: true },
    resolve: async ({ ctx }) => prisma.place.findMany({ where: { condominiumID: ctx.condominium.id } }),
  })
  .mutation("create", {
    input: CreatePlaceSchema,
    meta: { hasAuth: true },
    resolve: async ({ input: { name, capacity }, ctx }) => {
      const place = await prisma.place.create({
        data: {
          name,
          capacity,
          condominiumID: ctx.condominium.id,
        },
      });

      return place;
    },
  });
