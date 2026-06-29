export function cn(...inputs: (string | boolean | undefined | null | false)[]) {
  return inputs.filter(Boolean).join(" ");
}
