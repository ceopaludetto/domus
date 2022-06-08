export function immediate(function_: () => void) {
  window.setTimeout(function_, 0);
}
