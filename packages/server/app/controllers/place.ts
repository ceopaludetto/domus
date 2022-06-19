import * as TRPC from "@trpc/server";

import { prisma } from "~/utils/database";
import { IDSchema, CreatePlaceSchema } from "~/utils/validations";

export const places = TRPC.router()
  .query("findByID", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.place.findUnique({ where: { id } }),
  })
  .query("findCondominiumPlaces", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.place.findMany({ where: { condominiumID: id } }),
  })
  .mutation("createPlace", {
    input: CreatePlaceSchema,
    resolve: async ({ input: { name, capacity, condominiumID } }) => {
      const place = await prisma.place.create({
        data: {
          name,
          capacity,
          condominiumID,
        },
      });

      return place;
    },
  });
