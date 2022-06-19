export function immediate(callback: () => void) {
  window.setTimeout(callback, 0);
}
