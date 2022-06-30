import type { StackProps } from "@mui/material";

import { alpha, Box, Stack } from "@mui/material";

export type IStepperProps = StackProps & {
  max: number;
  step: number;
};

export function Stepper({ max, step, ...rest }: IStepperProps) {
  return (
    <Stack alignItems="center" direction="row" spacing={1} {...rest}>
      {Array.from({ length: max }, (value, key) => key).map((item) => (
        <Box
          key={item}
          sx={{
            aspectRatio: item === step ? "2 / 1" : "1 / 1",
            backgroundColor: (theme) =>
              item === step
                ? theme.palette.primary.main
                : alpha(theme.palette.secondary.main, theme.palette.mode === "dark" ? 0.15 : 0.09),
            borderRadius: 1,
            height: 10,
            transition: (theme) => theme.transitions.create(["background-color", "aspect-ratio"]),
          }}
        />
      ))}
    </Stack>
  );
}
