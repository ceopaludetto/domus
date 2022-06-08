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
