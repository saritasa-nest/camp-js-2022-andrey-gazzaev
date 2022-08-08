import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

/** Snack bar service. */
@Injectable({
  providedIn: 'root',
})
export class SnackBarService {

  public constructor(private readonly snackBar: MatSnackBar) { }

  /**
   *  Shows error.
   * @param message Error message.
   */
  public showError(message: string | undefined): void {
    const snackBarError = message ?? '';
    const snackBarAction = 'ok';
    const snackBarDuration = 2000;
    this.snackBar.open(snackBarError, snackBarAction, {
      duration: snackBarDuration,
    });
  }
}
