import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { AuthComponent } from './auth.component';
import { LoginComponent } from './login/login.component';
import { AuthRoutingModule } from './auth-routing.module';
import { RegistrationComponent } from './registration/registration.component';
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
    SharedModule,
    AuthRoutingModule,
  ],
})
export class AuthModule {}
