import type { Place } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPlaceValues } from "~/utils/validation";

import { prisma } from "~/utils/database.server";

export function getPlaceByID(id: string) {
  return prisma.place.findUnique({ where: { id } });
}

export function getCondominiumPlaces(id: string) {
  return prisma.place.findMany({ where: { condominiumID: id } });
}

export async function createPlace({ name, capacity }: IPlaceValues, condominiumID: string): Result<Place> {
  const place = await prisma.place.create({
    data: {
      name,
      capacity,
      condominiumID,
    },
  });

  return { data: place, error: null };
}
