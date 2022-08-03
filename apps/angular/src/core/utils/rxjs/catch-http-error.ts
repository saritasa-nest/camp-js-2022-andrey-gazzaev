import { catchError, MonoTypeOperatorFunction, ObservableInput, throwError } from 'rxjs';

import { HttpErrorResponse } from '@angular/common/http';

/**
 * Catch HttpErrorResponse operator.
 * Catches only HttpError<T> errors.
 * @param selector Selector.
 */
export function catchHttpErrorResponse<T, V>(
  selector: (error: HttpErrorResponse) => ObservableInput<V>,
): MonoTypeOperatorFunction<T | V> {
  return catchError((error: unknown) => {
    if (error instanceof HttpErrorResponse) {
      return selector(error);
    }
    return throwError(() => error);
  });
}
