import type { Application } from "express";

import * as TRPCExpress from "@trpc/server/adapters/express";
import helmet from "helmet";

import { condominiums, places, rules, users } from "~/controllers";
import { createContext, createRouter } from "~/middlewares";

export const router = createRouter()
  .merge("user.", users)
  .merge("place.", places)
  .merge("condominiums.", condominiums)
  .merge("rules.", rules);

const trpcMiddleware = TRPCExpress.createExpressMiddleware({
  router,
  createContext,
});

export function installMiddlewares(application: Application) {
  application.use(helmet());
  application.use("/trpc", trpcMiddleware);
}
