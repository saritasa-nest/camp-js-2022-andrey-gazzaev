import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isDefined } from '@js-camp/core/utils/guards/general.guard';

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
export class RegistrationComponent {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Is password confirm displayed. */
  public isHiddenPasswordConfirm = true;

  /** Registration form. */
  public readonly registrationForm: FormGroup<RegistrationFormControls>;

  public constructor(private readonly formBuilder: FormBuilder) {
    this.registrationForm = this.initRegistrationForm();
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

    const registrationData = this.registrationForm.value;

    if (
      isDefined(registrationData.password) &&
      isDefined(registrationData.passwordConfirm) &&
      registrationData.password.localeCompare(registrationData.passwordConfirm) !== 0) {

      this.registrationForm.controls.password.setErrors({
        passwordConfirm: true,
      });

      this.registrationForm.controls.passwordConfirm.setErrors({
        passwordConfirm: true,
      });

      return;
    }

    this.registrationForm.controls.passwordConfirm.setErrors({});
  }

  private initRegistrationForm(): FormGroup<RegistrationFormControls> {
    const passwordPattern = new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8,64}$');

    return this.formBuilder.group({
      email: ['test@test.com', [Validators.required, Validators.email]],
      firstName: ['123', [Validators.required]],
      lastName: ['123', [Validators.required]],
      password: ['12345678Test', [Validators.required, Validators.pattern(passwordPattern)]],
      passwordConfirm: ['123', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
