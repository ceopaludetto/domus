import type { User } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPersonalInfoValues, ISigninValues, ISignupValues } from "~/utils/validation";

import { toDate } from "@domus/utils";

import { client } from "~/utils/api.server";

export async function getUserByID(id: User["id"]) {
  return client.query("user.findByID", { id });
}

export async function checkLogin({ email, password }: ISigninValues): Result<User> {
  const user = await client.mutation("user.signin", { email, password });
  return { data: user, error: null };
}

export async function createUser({ email, firstName, lastName, password }: ISignupValues): Result<User> {
  const user = await client.mutation("user.signup", {
    email: email!,
    firstName: firstName!,
    lastName: lastName!,
    password: password!,
  });

  return { data: user, error: null };
}

export async function updateUser(id: string, { birthDate, ...rest }: IPersonalInfoValues): Result<User> {
  const date = birthDate ? toDate(birthDate).toDate() : undefined;
  const user = await client.mutation("user.update", {
    id,
    birthDate: date,
    ...rest,
  });

  return { data: user, error: null };
}
