import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

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
export class LoginComponent {

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  public constructor(
    private readonly formBuilder: FormBuilder,
  ) {
    this.loginForm = this.initLoginForm();
  }

  private initLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    },
    { updateOn: 'blur' });
  }
}
