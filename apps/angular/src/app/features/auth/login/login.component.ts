import { Subscription, tap } from 'rxjs';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectorRef, Component, OnDestroy, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { isFieldsDefined, isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

import { UserService, LoginErrors } from '../../../../core/services/user.service';

interface LoginFormControls {

  /** User email. */
  readonly email: FormControl<string | null>;

  /** User password. */
  readonly password: FormControl<string | null>;
}

/** Login component. */
@UntilDestroy()
@Component({
  selector: 'camp-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnDestroy {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  private readonly submitForm = new Subscription();

  public constructor(
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly router: Router,
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
    const fields = this.loginForm.getRawValue();
    if (!isFieldsDefined(fields)) {
      return;
    }

    const { password, email } = fields;

    this.userService.login({ email, password })
      .pipe(
        tap(errors => {
          if (errors !== undefined) {
            this.setErrors(errors);
          }
        }),
        untilDestroyed(this),
        tap(() => this.router.navigate(['/catalog'])),
      )
      .subscribe();
  }

  private setErrors(errors: LoginErrors): void {
    Object.entries(errors).forEach(([key, error]) => {
      if (isKeyOfObject(key, this.loginForm.controls)) {
        this.loginForm.controls[key].setErrors({
          [key]: error,
        });
        this.changeDetectorRef.markForCheck();
      }
    });
  }

  private initLoginForm(): FormGroup<LoginFormControls> {
    return this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
