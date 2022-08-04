import { catchError, of, tap, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpError } from '@js-camp/core/models/httpError';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';

import { showErrors } from '../../../../core/utils/show-errors';
import { UrlService } from '../../../../core/services/url.service';
import { UserService, RegistrationErrors } from '../../../../core/services/user.service';

interface LoginFormControls {

  /** Email control. */
  readonly email: FormControl<string | null>;

  /** Password control. */
  readonly password: FormControl<string | null>;
}

/** Login component. */
@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  public constructor(
    private readonly urlService: UrlService,
    private readonly snackBar: MatSnackBar,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.loginForm = this.initLoginForm();
  }

  /** Handles password toggle. */
  public handlePasswordToggle(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }

  /** Handles form submit. */
  public handleFormSubmit(): void {
    this.loginForm.markAllAsTouched();
    if (this.loginForm.invalid) {
      return;
    }
    const fields = this.loginForm.getRawValue();
    if (!isFieldsDefined(fields)) {
      return;
    }

    const { password, email } = fields;

    this.userService.login({ email, password })
      .pipe(
        tap(() => this.urlService.navigateToHome()),
        untilDestroyed(this),
        catchError((error: unknown) => {
          if (error instanceof HttpError) {
            return of(this.setErrors(error));
          }
          return throwError(() => error);
        }),
      )
      .subscribe();
  }

  private setErrors(errors: HttpError<RegistrationErrors>): void {
    showErrors(errors, this.snackBar, this.loginForm);
    this.changeDetectorRef.markForCheck();
  }

  private initLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
