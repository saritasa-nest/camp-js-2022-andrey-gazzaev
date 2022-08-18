import { AppError } from '@js-camp/core/models/app-error';

/** Error for components. */
export interface ExtractedError {

  /** Error messages for form fields. */
  readonly errorForFields: { [key: string]: string; };

  /** General error message. */
  readonly detail: string;
}

/**
 * Extracts error from AppError.
 * @param error AppError object.
 */
export function extractError<T>(error: AppError<T>): ExtractedError {
  const errorForFields: {
    [key: string]: string;
  } = {};

  if (error.data) {
    Object.entries(error.data).forEach(([key, value]) => {
      errorForFields[key] = value[0];
    });
  }

  return { errorForFields, detail: error.detail ?? 'Unknown error' };
}
