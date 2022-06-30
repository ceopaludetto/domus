import * as TRPC from "@trpc/server";
import bcrypt, { compare } from "bcryptjs";

import { createRouter } from "~/middlewares";
import { createJWTToken } from "~/middlewares/authorization";
import { prisma } from "~/utils/database";
import { SignupSchema, IDSchema, SigninSchema } from "~/utils/validations";
import { UpdateUserSchema } from "~/utils/validations/user/update";

export const users = createRouter()
  .query("findByID", {
    input: IDSchema,
    meta: { hasAuth: true },
    resolve: async ({ input: { id } }) => prisma.user.findUnique({ where: { id } }),
  })
  .mutation("update", {
    input: UpdateUserSchema,
    meta: { hasAuth: true },
    resolve: async ({ ctx, input: { email, firstName, lastName, birthDate, phone } }) => {
      const currentUser = await prisma.user.findUnique({ where: { email } });
      if (currentUser && currentUser.id !== ctx.user.id)
        throw new TRPC.TRPCError({
          code: "BAD_REQUEST",
          message: "User already signed",
        });

      const user = await prisma.user.update({
        data: { birthDate, email, firstName, lastName, phone },
        where: { id: ctx.user.id },
      });

      const token = createJWTToken(user.id);

      return { token, user };
    },
  })
  .mutation("signup", {
    input: SignupSchema,
    meta: { hasAuth: false },
    resolve: async ({ input: { password, email, ...rest } }) => {
      if (await prisma.user.findUnique({ where: { email } }))
        throw new TRPC.TRPCError({ code: "BAD_REQUEST", message: "User already signed" });

      const hash = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          ...rest,
          email,
          password: hash,
        },
      });

      const token = createJWTToken(user.id);

      return { token, user };
    },
  })
  .mutation("signin", {
    input: SigninSchema,
    meta: { hasAuth: false },
    resolve: async ({ input: { email, password } }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new TRPC.TRPCError({ code: "NOT_FOUND", message: "User not found" });
      if (!(await compare(password, user.password)))
        throw new TRPC.TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });

      const token = createJWTToken(user.id);

      return { token, user };
    },
  });
