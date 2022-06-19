import type { router } from "./utils/middlewares";

import express from "express";

import { installMiddlewares } from "./utils/middlewares";

const application = express();

installMiddlewares(application);

application.listen(3333, () => {
  // eslint-disable-next-line no-console
  console.log("Server App started at http://localhost:3333");
});

export type AppRouter = typeof router;
