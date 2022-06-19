import type { Place } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPlaceValues } from "~/utils/validation";

import { client } from "~/utils/api.server";

export function getPlaceByID(id: string) {
  return client.query("place.findByID", { id });
}

export function getCondominiumPlaces(id: string) {
  return client.query("place.findCondominiumPlaces", { id });
}

export async function createPlace({ name, capacity }: IPlaceValues, condominiumID: string): Result<Place> {
  const place = await client.mutation("place.createPlace", {
    name,
    capacity,
    condominiumID,
  });

  return { data: place, error: null };
}
