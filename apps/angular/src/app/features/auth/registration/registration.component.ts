import { catchError, of, tap, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { AppError } from '@js-camp/core/models/httpError';

import { UrlService } from '../../../../core/services/url.service';
import { showErrorsFormFields } from '../../../../core/utils/show-errors';
import { SnackBarService } from '../../../../core/services/snack-bar.service';
import { UserService, RegistrationErrors } from '../../../../core/services/user.service';

interface RegistrationFormControls {

  /** Email control. */
  readonly email: FormControl<string>;

  /** First name control. */
  readonly firstName: FormControl<string>;

  /** Last name control. */
  readonly lastName: FormControl<string>;

  /** Password control. */
  readonly password: FormControl<string>;

  /** Password confirm control. */
  readonly passwordConfirm: FormControl<string>;
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
    private readonly urlService: UrlService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly snackBarService: SnackBarService,
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

    const { password, email, firstName, lastName } = this.registrationForm.getRawValue();

    const avatarUrl =
      'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/' +
      'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

    this.userService.register({ password, email, firstName, lastName, avatarUrl })
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
    showErrorsFormFields(errors, this.registrationForm);
    this.changeDetectorRef.markForCheck();
  }

  private initRegistrationForm(): FormGroup<RegistrationFormControls> {
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,64}$/i;

    return this.formBuilder.nonNullable.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      passwordConfirm: ['', [Validators.required, this.matchControl()]],
    }, { updateOn: 'blur' });
  }

  private matchControl(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        this.registrationForm &&
        this.registrationForm.get('password')?.value !== control.value
      ) {
        return {
          match: 'Passwords did not match',
        };
      }
      return null;
    };
  }
}
