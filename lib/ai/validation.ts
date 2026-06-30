export function validateUserInput(
  text: string,
  maxLength: number
): { valid: boolean; error?: string } {
  const trimmed = text.trim();
  if (trimmed.length === 0) {
    return { valid: false, error: "Please enter a question or description." };
  }
  if (trimmed.length > maxLength) {
    return {
      valid: false,
      error: `Please limit your input to ${maxLength} characters.`,
    };
  }
  return { valid: true };
}
