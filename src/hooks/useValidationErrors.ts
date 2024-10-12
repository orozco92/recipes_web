import { useEffect, useState } from "react";
import { ValidationError } from "../core/errors";

export function useValidationErrors() {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [error, setValidationError] = useState<ValidationError>();

  useEffect(() => {
    if (error?.validationErrors) {
      const e: Record<string, string> = {};
      for (const [key, value] of Object.entries<Record<string, string>>(
        error.validationErrors
      )) {
        e[key] = Object.values(value).join(", ");
      }
      setErrors(e);
    }
  }, [error]);

  return { errors, setValidationError };
}
