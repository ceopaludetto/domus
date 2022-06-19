import * as TRPC from "@trpc/server";
import * as TRPCExpress from "@trpc/server/adapters/express";
import express from "express";

import { condominiums, places, rules, users } from "./controllers";

const appRouter = TRPC.router()
  .merge("user.", users)
  .merge("place.", places)
  .merge("condominiums.", condominiums)
  .merge("rules.", rules);

const app = express();

app.use(
  "/trpc",
  TRPCExpress.createExpressMiddleware({
    router: appRouter,
  })
);

app.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log("Server App started at http://localhost:3333");
});

export type AppRouter = typeof appRouter;
