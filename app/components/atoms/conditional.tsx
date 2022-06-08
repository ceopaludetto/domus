import { cloneElement } from "react";

export type IConditionalProps = {
  children: JSX.Element;
  condition: boolean;
  wrap: (children: JSX.Element) => JSX.Element;
};

export function Conditional({ condition, children, wrap }: IConditionalProps) {
  if (condition) return wrap(cloneElement(children));
  return children;
}
