import type { Application } from "express";

import * as TRPC from "@trpc/server";
import * as TRPCExpress from "@trpc/server/adapters/express";
import helmet from "helmet";

import { condominiums, places, rules, users } from "~/controllers";

export const router = TRPC.router()
  .merge("user.", users)
  .merge("place.", places)
  .merge("condominiums.", condominiums)
  .merge("rules.", rules);

const trpcMiddleware = TRPCExpress.createExpressMiddleware({
  router,
});

export function installMiddlewares(application: Application) {
  application.use(helmet());
  application.use("/trpc", trpcMiddleware);
}
