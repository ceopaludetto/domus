import type { User } from "@prisma/client";

import { createCookieSessionStorage, redirect } from "@remix-run/node";

import { getUserByID, getUserCondominiums } from "~/models";

export const sessionStorage = createCookieSessionStorage({
  cookie: {
    name: "__session",
    httpOnly: true,
    maxAge: 0,
    path: "/",
    sameSite: "lax",
    secrets: ["SomeRandomSecret@123"],
    secure: process.env.NODE_ENV === "production",
  },
});

const UserSessionKey = "@USER";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function logout(request: Request) {
  const session = await getSession(request);
  return redirect("/", { headers: { "Set-Cookie": await sessionStorage.destroySession(session) } });
}

export async function getUserID(request: Request): Promise<User["id"] | undefined> {
  const session = await getSession(request);
  return session.get(UserSessionKey);
}

export async function getUser(request: Request) {
  const id = await getUserID(request);
  if (!id) return null;

  const user = await getUserByID(id);
  if (user) return user;

  throw logout(request);
}

export async function createUserSession(request: Request, id: string, customRedirectTo?: string) {
  const session = await getSession(request);
  session.set(UserSessionKey, id);

  const condominiums = await getUserCondominiums(id);
  const redirectTo = customRedirectTo ?? condominiums[0].id;

  return redirect(redirectTo, {
    headers: {
      "Set-Cookie": await sessionStorage.commitSession(session, { maxAge: 60 * 60 * 24 * 7 }),
    },
  });
}

export async function requireUserID(request: Request, redirectTo = new URL(request.url).pathname) {
  const id = await getUserID(request);
  if (id) return id;

  const parameters = new URLSearchParams([["redirectTo", redirectTo]]);
  throw redirect(`/authentication/signin?${parameters}`);
}

export async function requireUser(request: Request) {
  const id = await requireUserID(request);

  const user = await getUserByID(id);
  if (user) return user;

  throw logout(request);
}

export async function dontRequireUser(request: Request) {
  const id = await getUserID(request);
  if (!id) return null;

  const condominiums = await getUserCondominiums(id);
  const redirectTo = condominiums[0].id;

  throw redirect(`/${redirectTo}`);
}
