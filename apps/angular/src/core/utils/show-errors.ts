import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpError } from '@js-camp/core/models/httpError';
import { isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

/**
 * Error output as snackBar.
 * @param message Error message.
 * @param snackBar Snack bar service.
 */
export function showSnackBarError(message: string | undefined, snackBar: MatSnackBar): void {
  const snackBarError = message ?? '';
  const snackBarAction = 'ok';
  const snackBarDuration = 2000;
  snackBar.open(snackBarError, snackBarAction, {
    duration: snackBarDuration,
  });
}

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
