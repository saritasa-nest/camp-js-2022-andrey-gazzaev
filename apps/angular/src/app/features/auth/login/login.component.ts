import { catchError, of, tap, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppError } from '@js-camp/core/models/httpError';

import { UrlService } from '../../../../core/services/url.service';
import { showErrorsFormFields } from '../../../../core/utils/show-errors';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { UserService, RegistrationErrors } from '../../../../core/services/user.service';

interface LoginFormControls {

  /** Email control. */
  readonly email: FormControl<string>;

  /** Password control. */
  readonly password: FormControl<string>;
}

/** Login component. */
@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly snackBarService: SnackBarService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.loginForm = this.initLoginForm();
  }

  /** Handles form submit. */
  public handleFormSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }

    const { password, email } = this.loginForm.getRawValue();

    this.userService.login({ email, password })
      .pipe(
        tap(() => this.urlService.navigateToHome()),
        untilDestroyed(this),
        catchError((error: unknown) => {
          if (error instanceof AppError) {
            return of(this.setErrors(error));
          }
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  private setErrors(errors: AppError<RegistrationErrors>): void {
    this.snackBarService.showError(errors.detail);
    showErrorsFormFields(errors, this.loginForm);
    this.changeDetectorRef.markForCheck();
  }

  private initLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
