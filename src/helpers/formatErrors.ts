import type { FieldError } from "react-hook-form";

export const formatErrors = (errors: Record<string, FieldError>) =>
  Object.keys(errors).map((key) => ({
    key,
    message: errors[key].message,
  }));
