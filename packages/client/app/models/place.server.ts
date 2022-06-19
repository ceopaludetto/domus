import type { Place } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPlaceValues } from "~/utils/validation";

import { withClient } from "~/utils/api.server";

export const getPlaceByID = withClient(async (client, id: Place["id"]) => client.query("place.findByID", { id }));

export const getCondominiumPlaces = withClient(async (client) => client.query("place.findByCondominiumID"));

export const createPlace = withClient(async (client, { name, capacity }: IPlaceValues): Result<Place> => {
  const place = await client.mutation("place.create", {
    name,
    capacity,
  });

  return { data: place, error: null };
});
