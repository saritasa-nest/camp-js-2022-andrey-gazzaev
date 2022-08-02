import { Subscription } from 'rxjs';

import { Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { AuthService } from '../../../../core/services/auth.service';

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
@Component({
  selector: 'camp-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['../auth.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistrationComponent implements OnDestroy {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Is password confirm displayed. */
  public isHiddenPasswordConfirm = true;

  /** Registration form. */
  public readonly registrationForm: FormGroup<RegistrationFormControls>;

  private readonly submitForm = new Subscription();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.registrationForm = this.initRegistrationForm();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.submitForm.unsubscribe();
  }

  /** Handles password toggle. */
  public handlePasswordToggle(): void {
    this.isHiddenPassword = !this.isHiddenPassword;
  }

  /** Handles password confirm toggle. */
  public handlePasswordConfirmToggle(): void {
    this.isHiddenPasswordConfirm = !this.isHiddenPasswordConfirm;
  }

  /** Handles form submit. */
  public handleFormSubmit(): void {
    this.registrationForm.markAllAsTouched();
    if (this.registrationForm.invalid) {
      return;
    }

    const { password, passwordConfirm, email, firstName, lastName } = this.registrationForm.value;

    if (
      isDefined(password) &&
      isDefined(passwordConfirm) &&
      password.localeCompare(passwordConfirm) !== 0) {

      const passwordConfirmError = {
        passwordConfirm: true,
      };

      this.registrationForm.controls.password.setErrors(passwordConfirmError);
      this.registrationForm.controls.passwordConfirm.setErrors(passwordConfirmError);

      return;
    }

    if (
      isDefined(password) &&
      isDefined(email) &&
      isDefined(firstName) &&
      isDefined(lastName)
    ) {
      this.submitForm.add(
        this.authService.register({
          password,
          email,
          firstName,
          lastName,
        }).subscribe(),
      );
    }
  }

  private initRegistrationForm(): FormGroup<RegistrationFormControls> {
    const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$');

    return this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      firstName: ['123', [Validators.required]],
      lastName: ['123', [Validators.required]],
      password: ['12345678Test', [Validators.required, Validators.pattern(passwordPattern)]],
      passwordConfirm: ['12345678Tes', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
