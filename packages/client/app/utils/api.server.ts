import type { ClientRequest, ClientRequestSchema } from "./types";
import type { AppRouter } from "@domus/server";
import type { Session } from "@remix-run/node";
import type { Params } from "react-router";
import type { PromiseType } from "utility-types";

import { createTRPCClient } from "@trpc/client";

import { getUserToken } from "./session.server";

export async function createClient(request: Request, params?: Params<string>, session?: Session) {
  const token = await getUserToken(request, session);
  const condominiumID = params?.condominium;

  return createTRPCClient<AppRouter>({
    headers: { Authorization: token ? `Bearer ${token}` : undefined, Condominium: condominiumID },
    url: "http://localhost:3333/trpc",
  });
}

export function withClient<T extends Promise<any> = Promise<any>, U = undefined>(route: ClientRequestSchema<T, U>) {
  return async ({ request, data, params, session }: ClientRequest<U>): Promise<PromiseType<T>> => {
    const client = await createClient(request, params, session);
    const res = await route(client, data!);

    return res;
  };
}
