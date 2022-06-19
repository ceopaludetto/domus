import type { AppRouter } from "@domus/server";
import type { Session } from "@remix-run/node";
import type { TRPCClient } from "@trpc/client";
import type { Params } from "react-router";
import type { ValidatorError } from "remix-validated-form";

export type ColorMode = "dark" | "light";

export type SuccessResult<T> = {
  data: T;
  error: null;
};
export type FailureResult = {
  data: null;
  error: ValidatorError;
};
export type Result<T> = Promise<SuccessResult<T> | FailureResult>;

export type Client = TRPCClient<AppRouter>;
export type ClientRequestSchema<T, U> = (client: Client, data: U) => T;
export type ClientRequestData<U> = U extends undefined ? { data?: U } : { data: U };
export type ClientRequest<U> = {
  params?: Params<string>;
  request: Request;
  session?: Session;
} & ClientRequestData<U>;
