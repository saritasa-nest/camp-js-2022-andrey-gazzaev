import { Subscription } from 'rxjs';

import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { isDefined } from '@js-camp/core/utils/guards/general.guard';

import { AuthService } from '../../../../core/services/auth.service';

interface LoginFormControls {

  /** User email. */
  readonly email: FormControl<string | null>;

  /** User password. */
  readonly password: FormControl<string | null>;
}

/** Login component. */
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnDestroy {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  private readonly submitForm = new Subscription();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.initLoginForm();
  }

  /** @inheritdoc */
  public ngOnDestroy(): void {
    this.submitForm.unsubscribe();
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

    const loginData = this.loginForm.value;
    if (isDefined(loginData.email) && isDefined(loginData.password)) {
      this.submitForm.add(this.authService.login({ email: loginData.email, password: loginData.password }).subscribe());
    }
  }

  private initLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
