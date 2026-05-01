import { ValidationStatus, IValidationResult } from '@/types/validation';

export function validateExercise(
  name: string,
  tags: string[],
): IValidationResult {
  if (!name.trim())
    return {
      status: ValidationStatus.Error,
      message: 'Exercise name is required!',
    };
  if (name.length < 3)
    return {
      status: ValidationStatus.Error,
      message: 'Exercise name is too short!',
    };
  if (tags.length === 0)
    return {
      status: ValidationStatus.Error,
      message: 'Select at least one muscle group',
    };

  return {
    status: ValidationStatus.Success,
    message: 'Custom exercise created!',
  };
}
