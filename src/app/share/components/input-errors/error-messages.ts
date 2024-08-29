export const ERROR_MESSAGES = (
  label: string
): {
  [key in string]: (args: Record<string, string>, label?: string) => string;
} => {
  return {
    required: () => `Vui lòng nhập ${label}`,
    email: () => `Not a valid email`,
    minlength: ({ requiredLength }) =>
      `Vui lòng nhập ${label} tối thiểu ${requiredLength} ký tự`,
    maxlength: ({ requiredLength }) =>
      `Vui lòng nhập ${label} tối đa ${requiredLength} ký tự`,
  };
};
