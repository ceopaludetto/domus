/* eslint-disable no-underscore-dangle */
import { PrismaClient } from "@prisma/client";

// eslint-disable-next-line import/no-mutable-exports
let prisma: PrismaClient;

declare global {
  // eslint-disable-next-line vars-on-top, no-var, @typescript-eslint/naming-convention
  var __db__: PrismaClient;
}

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient();
  }
  prisma = global.__db__;
  prisma.$connect();
}

export { prisma };
