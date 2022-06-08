import type { User } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPersonalInfoValues, ISigninValues, ISignupValues } from "~/utils/validation";

import { compare, hash } from "bcryptjs";

import { prisma } from "~/utils/database.server";
import { toDate } from "~/utils/date";

export async function getUserByID(id: User["id"]) {
  return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
  return prisma.user.findUnique({ where: { email } });
}

export async function checkLogin({ email, password }: ISigninValues): Result<User> {
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) return { data: null, error: { fieldErrors: { email: "Usuário não encontrado" } } };
  if (!(await compare(password, user.password)))
    return { data: null, error: { fieldErrors: { password: "Senha incorreta" } } };

  return { data: user, error: null };
}

export async function createUser({ email, firstName, lastName, password }: ISignupValues): Result<User> {
  if (await getUserByEmail(email)) return { data: null, error: { fieldErrors: { email: "Usuário já cadastrado" } } };

  const user = await prisma.user.create({
    data: {
      email,
      firstName,
      lastName,
      password: await hash(password, 10),
      condominiums: {
        create: {
          condominium: {
            create: {
              name: "Edifício Itália",
            },
          },
        },
      },
    },
  });

  return { data: user, error: null };
}

export async function updateUser(
  id: string,
  { email, firstName, lastName, birthDate, phone }: IPersonalInfoValues
): Result<User> {
  const currentUser = await getUserByEmail(email);
  if (currentUser && currentUser.id !== id)
    return { data: null, error: { fieldErrors: { email: "Usuário já cadastrado" } } };

  const date = birthDate ? toDate(birthDate).toDate() : null;
  const user = await prisma.user.update({
    where: { id },
    data: { email, firstName, lastName, phone, birthDate: date },
  });

  return { data: user, error: null };
}
