import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { AuthComponent } from './auth.component';
import { PasswordInputComponent } from './password-input/password-input.component';

/** Authorization module. */
@NgModule({
  declarations: [
    LoginComponent,
    RegistrationComponent,
    AuthComponent,
    PasswordInputComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    AuthRoutingModule,
    MatSnackBarModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
})
export class AuthModule {}
