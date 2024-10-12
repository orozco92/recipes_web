import { ApiValidationError } from "./interfaces";

export class ValidationError extends Error {
  validationErrors: Record<string, Record<string, string>>;

  constructor(errors: ApiValidationError[]) {
    super("Validation error");
    this.validationErrors = this.buildValidationErrors(errors);
  }

  buildValidationErrors(errors: ApiValidationError[]) {
    return errors.reduce<Record<string, Record<string, string>>>((p, c) => {
      p[c.property] = c.errors;
      return p;
    }, {});
  }
}
