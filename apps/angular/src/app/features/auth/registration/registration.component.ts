import { catchError, of, tap, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { MatSnackBar } from '@angular/material/snack-bar';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { HttpError } from '@js-camp/core/models/httpError';
import { isFieldsDefined } from '@js-camp/core/utils/guards/general.guard';

import { showErrorsFormFields, showSnackBarError } from '../../../../core/utils/show-errors';
import { UrlService } from '../../../../core/services/url.service';
import { UserService, RegistrationErrors } from '../../../../core/services/user.service';

interface RegistrationFormControls {

  /** Email control. */
  readonly email: FormControl<string | null>;

  /** First name control. */
  readonly firstName: FormControl<string | null>;

  /** Last name control. */
  readonly lastName: FormControl<string | null>;

  /** Password control. */
  readonly password: FormControl<string | null>;

  /** Password confirm control. */
  readonly passwordConfirm: FormControl<string | null>;
}

/** Registration component. */
@UntilDestroy()
@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationComponent {
  /** Registration form. */
  public readonly registrationForm: FormGroup<RegistrationFormControls>;

  public constructor(
    private readonly snackBar: MatSnackBar,
    private readonly urlService: UrlService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.registrationForm = this.initRegistrationForm();
  }

  /** Handles form submit. */
  public onFormSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) {
      return;
    }

    const fields = this.registrationForm.getRawValue();
    if (!isFieldsDefined(fields)) {
      return;
    }

    const { password, passwordConfirm, email, firstName, lastName } = fields;

    if (!this.comparePasswords(password, passwordConfirm)) {
      return;
    }

    const userInfo = { password, email, firstName, lastName };
    this.userService.register(userInfo)
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

  private comparePasswords(password: string, passwordConfirm: string): boolean {
    if (password.localeCompare(passwordConfirm) === 0) {
      return true;
    }

    const passwordConfirmError = {
      password: ['Passwords do not match'],
    };

    this.registrationForm.controls.password.setErrors(passwordConfirmError);
    this.registrationForm.controls.passwordConfirm.setErrors(passwordConfirmError);

    return false;
  }

  private setErrors(errors: HttpError<RegistrationErrors>): void {
    showSnackBarError(errors.detail, this.snackBar);
    showErrorsFormFields(errors, this.registrationForm);
    this.changeDetectorRef.markForCheck();
  }

  private initRegistrationForm(): FormGroup<RegistrationFormControls> {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i;

    return this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      firstName: ['123', [Validators.required]],
      lastName: ['123', [Validators.required]],
      password: ['12345678Test', [Validators.required, Validators.pattern(passwordPattern)]],
      passwordConfirm: ['12345678Tes', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}