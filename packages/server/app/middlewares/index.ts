import type * as TRPCExpress from "@trpc/server/adapters/express";

import * as TRPC from "@trpc/server";

import { getUserByHeader } from "./authorization";
import { getCondominiumByHeader } from "./condominium";

export async function createContext(context: TRPCExpress.CreateExpressContextOptions) {
  const user = await getUserByHeader(context);
  const condominium = await getCondominiumByHeader(context);

  return { user, condominium };
}

export type Context = TRPC.inferAsyncReturnType<typeof createContext>;
export type Meta = { hasAuth?: boolean; hasCondominium?: boolean };

export function createRouter() {
  return TRPC.router<Context, Meta>()
    .middleware(({ ctx, meta, next }) => {
      if (meta?.hasAuth && !ctx.user) throw new TRPC.TRPCError({ code: "UNAUTHORIZED", message: "User not found" });
      return next({ ctx: { ...ctx, user: ctx.user! } });
    })
    .middleware(({ ctx, meta, next }) => {
      if (meta?.hasCondominium && !ctx.condominium)
        throw new TRPC.TRPCError({ code: "UNAUTHORIZED", message: "Condominium not found" });
      return next({ ctx: { ...ctx, condominium: ctx.condominium! } });
    });
}
