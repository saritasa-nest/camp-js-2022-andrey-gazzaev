import { FormGroup } from '@angular/forms';
import { HttpError } from '@js-camp/core/models/httpError';
import { isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

/**
 * Shows all errors that the user has received.
 * @param error Error collection.
 * @param formGroup Fields for displaying errors.
 */
export function showErrorsFormFields<T>(
  error: HttpError<T>,
  formGroup: FormGroup,
): void {
  if (error.data) {
    Object.entries(error.data).forEach(([key, message]) => {
      if (isKeyOfObject(key, formGroup.controls)) {
        formGroup.controls[key].setErrors({
          [key]: message,
        });
      }
    });
  }
}
