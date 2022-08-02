import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';

import { UserService } from '../../../core/services/user.service';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';

/** Authorization module. */
@NgModule({
  declarations: [LoginComponent, RegistrationComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    AuthRoutingModule,
    MatFormFieldModule,
    ReactiveFormsModule,
  ],
  providers: [UserService],
})
export class AuthModule { }
