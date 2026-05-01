export enum ValidationStatus {
  Success = 'success',
  Error = 'error',
}

export interface IValidationResult {
  status: ValidationStatus;
  message: string;
}
