import { catchError, of, Subscription, tap, throwError } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';

import { HttpError } from '@js-camp/core/models/httpError';
import { isFieldsDefined, isKeyOfObject } from '@js-camp/core/utils/guards/general.guard';

import { UrlService } from '../../../../core/services/url.service';
import { UserService, LoginErrors, RegistrationErrors } from '../../../../core/services/user.service';

interface LoginFormControls {

  /** User email. */
  readonly email: FormControl<string | null>;

  /** User password. */
  readonly password: FormControl<string | null>;
}

/** Login component. */
@UntilDestroy()
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent implements OnDestroy {

  /** Is password displayed. */
  public isHiddenPassword = true;

  /** Login form. */
  public readonly loginForm: FormGroup<LoginFormControls>;

  private readonly submitForm = new Subscription();

  public constructor(
    private readonly urlService: UrlService,
    private readonly formBuilder: FormBuilder,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
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
        tap(() => this.urlService.navigateToHome()),
        untilDestroyed(this),
        catchError((error: unknown) => {
          if (error instanceof HttpError) {
            return of(this.setErrors(error.data as RegistrationErrors));
          }
          return throwError(() => error);
        }),
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
      email: ['test@test.com', [Validators.required, Validators.email]],
      password: ['12345678Test', [Validators.required]],
    }, { updateOn: 'blur' });
  }
}
