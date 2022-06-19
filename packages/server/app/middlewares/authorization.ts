import type { User } from "@prisma/client";
import type * as TRPCExpress from "@trpc/server/adapters/express";

import JWT from "jsonwebtoken";

import { prisma } from "~/utils/database";

export async function getUserByHeader({ req }: TRPCExpress.CreateExpressContextOptions) {
  if (req.headers.authorization) {
    const [, token] = req.headers.authorization.split(" ");

    try {
      const { id } = JWT.verify(token, process.env.AUTHORIZATION_KEY) as { id: string };
      if (!id) return null;

      const user = await prisma.user.findUnique({ where: { id } });
      return user;
    } catch (error) {
      return null;
    }
  }

  return null;
}

export function createJWTToken(id: User["id"]) {
  return JWT.sign({ id }, process.env.AUTHORIZATION_KEY, { expiresIn: "7d" });
}
