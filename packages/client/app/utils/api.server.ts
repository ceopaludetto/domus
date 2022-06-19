import type { AppRouter } from "@domus/server";

import { createTRPCClient } from "@trpc/client";

export const client = createTRPCClient<AppRouter>({
  url: "http://localhost:3333/trpc",
});
