import { tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectorRef, Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isFieldsDefined, isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

import { AuthService, RegistrationErrors } from '../../../../core/services/user.service';

interface RegistrationFormControls {

  /** User email. */
  readonly email: FormControl<string | null>;

  /** First Name. */
  readonly firstName: FormControl<string | null>;

  /** Last name. */
  readonly lastName: FormControl<string | null>;

  /** User password. */
  readonly password: FormControl<string | null>;

  /** Password confirm. */
  readonly passwordConfirm: FormControl<string | null>;
}

/** Registration component. */
@UntilDestroy()
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Is password confirm displayed. */
  public isHiddenPasswordConfirm = true;

  /** Registration form. */
  public readonly registrationForm: FormGroup<RegistrationFormControls>;

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly changeDetectorRef: ChangeDetectorRef,
  ) {
    this.registrationForm = this.initRegistrationForm();
  }

  /** Handles password toggle. */
  public onPasswordToggle(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }

  /** Handles password confirm toggle. */
  public onPasswordConfirmToggle(): void {
    this.isHiddenPasswordConfirm = !this.isHiddenPasswordConfirm;
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
    this.authService.register(userInfo)
      .pipe(
        tap(errors => {
          if (errors !== undefined) {
            this.setErrors(errors);
          }
        }),
        untilDestroyed(this),
      )
      .subscribe();
  }

  private comparePasswords(password: string, passwordConfirm: string): boolean {
    if (password.localeCompare(passwordConfirm) === 0) {
      return true;
    }

    const passwordConfirmError = {
      passwordConfirm: true,
    };

    this.registrationForm.controls.password.setErrors(passwordConfirmError);
    this.registrationForm.controls.passwordConfirm.setErrors(passwordConfirmError);

    return false;
  }

  private setErrors(errors: RegistrationErrors): void {
    Object.entries(errors).forEach(([key, error]) => {
      if (isKeyOfObject(key, this.registrationForm.controls)) {
        this.registrationForm.controls[key].setErrors({
          [key]: error,
        });
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private initRegistrationForm(): FormGroup<RegistrationFormControls> {
    const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$');

    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern(passwordPattern)]],
      passwordConfirm: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
