import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpError } from '@js-camp/core/models/httpError';
import { isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

/**
 * Shows all errors that the user has received.
 * @param error Error collection.
 * @param snackBar Snack bar service.
 * @param formGroup Fields for displaying errors.
 */
export function showErrors<T>(
  error: HttpError<T>,
  snackBar: MatSnackBar,
  formGroup: FormGroup,
): void {
  const snackBarError = error.detail ?? '';
  const snackBarAction = 'ok';
  const snackBarDuration = 2000;
  snackBar.open(snackBarError, snackBarAction, {
    duration: snackBarDuration,
  });
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
