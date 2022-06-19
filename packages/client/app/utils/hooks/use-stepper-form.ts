import type { FormEvent } from "react";
import type { ValidatorError } from "remix-validated-form";

import { immediate } from "@domus/utils";
import { useActionData } from "@remix-run/react";
import { useRef, useEffect, useCallback, useState } from "react";
import { useFormContext } from "remix-validated-form";

type IUseStepperFormProps = {
  fields: string[][];
  formID?: string;
  initialValue?: number;
};

function isValidationError(data: any): data is ValidatorError {
  return typeof data === "object" && "fieldErrors" in data;
}

export function useStepperForm({ formID, initialValue = 0, fields }: IUseStepperFormProps) {
  const ref = useRef<HTMLFormElement>(null);
  const data = useActionData();
  const context = useFormContext(formID);

  const [step, setStep] = useState(initialValue);
  const max = fields.length - 1;

  const focusFirstElement = useCallback(
    (index: number, name?: string) => {
      if (ref.current) {
        const elements = fields[index];
        const element = [...ref.current.elements].find((el) => {
          if (name && el instanceof HTMLInputElement && el.name === name) return el;
          if (!name && el instanceof HTMLInputElement && elements.includes(el.name)) return el;
          return undefined;
        });

        if (element) immediate(() => (element as HTMLElement).focus());
      }
    },
    [fields]
  );

  const next = useCallback(async () => {
    const res = await context.validate();
    if (res.error) return;
    if (step + 1 > max) return;

    setStep(step + 1);
    focusFirstElement(step + 1);
  }, [step, max, context, focusFirstElement]);

  const previous = useCallback(() => {
    if (step - 1 < 0) return;

    setStep(step - 1);
    focusFirstElement(step - 1);
  }, [step, focusFirstElement]);

  const set = useCallback(
    (value: number) => {
      if (value >= 0 && value <= max) setStep(value);
    },
    [max]
  );

  const onSubmit = useCallback(
    async (_: unknown, e: FormEvent<HTMLFormElement>) => {
      if (step !== max) {
        e.preventDefault();
        await next();
      }
    },
    [step, max, next]
  );

  useEffect(() => {
    if (isValidationError(data) && ref.current) {
      const first = Object.keys(data.fieldErrors)[0];
      const index = fields.findIndex((items) => items.includes(first));

      const element = [...ref.current.elements].find((el) => {
        if (el instanceof HTMLInputElement && el.name === first) return el;
        return undefined;
      });

      set(index);
      if (element) immediate(() => (element as HTMLElement).focus());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, set, ref.current]);

  return [
    step,
    {
      next,
      prev: previous,
      onSubmit,
      ref,
    },
  ] as const;
}
