import * as TRPC from "@trpc/server";
import bcrypt, { compare } from "bcryptjs";

import { prisma } from "~/utils/database";
import { SignupSchema, IDSchema, SigninSchema } from "~/utils/validations";
import { UpdateUserSchema } from "~/utils/validations/user/update";

export const users = TRPC.router()
  .query("findByID", {
    input: IDSchema,
    resolve: async ({ input: { id } }) => prisma.user.findUnique({ where: { id } }),
  })
  .mutation("update", {
    input: UpdateUserSchema,
    resolve: async ({ input: { id, email, firstName, lastName, birthDate, phone } }) => {
      const currentUser = await prisma.user.findUnique({ where: { email } });
      if (currentUser && currentUser.id !== id)
        throw new TRPC.TRPCError({
          code: "BAD_REQUEST",
          message: "User already signed",
        });

      const user = await prisma.user.update({
        where: { id },
        data: { email, firstName, lastName, birthDate, phone },
      });

      return user;
    },
  })
  .mutation("signup", {
    input: SignupSchema,
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

      return user;
    },
  })
  .mutation("signin", {
    input: SigninSchema,
    resolve: async ({ input: { email, password } }) => {
      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) throw new TRPC.TRPCError({ code: "NOT_FOUND", message: "User not found" });
      if (!(await compare(password, user.password)))
        throw new TRPC.TRPCError({ code: "UNAUTHORIZED", message: "Incorrect password" });

      return user;
    },
  });
