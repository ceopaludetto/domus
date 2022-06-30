import type { TextFieldProps } from "@mui/material";
import type { AnyMaskedOptions } from "imask";

import { IconButton, InputAdornment, TextField } from "@mui/material";
import IMask from "imask";
import { Eye, EyeOff } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useField } from "remix-validated-form";

import { Tooltip } from "../atoms";

export type IControlProps = Omit<TextFieldProps, "id"> & {
  maskOptions?: AnyMaskedOptions;
  name: string;
};

export function Control({ name, maskOptions, helperText, type, InputProps, ...rest }: IControlProps) {
  const reference = useRef<HTMLInputElement>();

  const [visible, setVisible] = useState(false);
  const { error, getInputProps } = useField(name);

  const currentType = useMemo(() => {
    if (type !== "password") return type;
    return visible ? "text" : "password";
  }, [type, visible]);

  const showPassword = useCallback(() => {
    setVisible((current) => !current);
  }, []);

  useEffect(() => {
    if (!!maskOptions && reference.current) {
      const m = IMask(reference.current, maskOptions);
      return () => m.destroy();
    }
    return () => {};
  }, [maskOptions]);

  return (
    <TextField
      inputRef={reference}
      {...getInputProps({
        error: !!error,
        helperText: error ?? helperText,
        id: name,
        InputProps: {
          endAdornment: type === "password" && (
            <InputAdornment position="end">
              <Tooltip describeChild title={visible ? "Esconder senha" : "Mostrar senha"}>
                <IconButton color="primary" onClick={showPassword}>
                  {visible ? <EyeOff /> : <Eye />}
                </IconButton>
              </Tooltip>
            </InputAdornment>
          ),
          ...InputProps,
        },
        type: currentType,
        ...rest,
      })}
    />
  );
}

Control.defaultProps = {
  maskOptions: undefined,
};
