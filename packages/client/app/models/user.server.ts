import type { User } from "@prisma/client";
import type { Result } from "~/utils/types";
import type { IPersonalInfoValues, ISigninValues, ISignupValues } from "~/utils/validation";

import { toDate } from "@domus/utils";

import { withClient } from "~/utils/api.server";

type UserWithToken = { token: string; user: User };

export const getUserByID = withClient(async (client, id: User["id"]) => client.query("user.findByID", { id }));

export const checkLogin = withClient(async (client, { email, password }: ISigninValues): Result<UserWithToken> => {
  const data = await client.mutation("user.signin", { email, password });
  return { data, error: null };
});

export const createUser = withClient(
  async (client, { email, firstName, lastName, password }: ISignupValues): Result<UserWithToken> => {
    const data = await client.mutation("user.signup", {
      email: email!,
      firstName: firstName!,
      lastName: lastName!,
      password: password!,
    });

    return { data, error: null };
  }
);

export const updateUser = withClient(
  async (client, { birthDate, ...rest }: IPersonalInfoValues): Result<UserWithToken> => {
    const date = birthDate ? toDate(birthDate).toDate() : undefined;
    const data = await client.mutation("user.update", {
      birthDate: date,
      ...rest,
    });

    return { data, error: null };
  }
);
