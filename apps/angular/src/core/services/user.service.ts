import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

import { User } from '@js-camp/core/models/user';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';

import { AuthService } from './auth.service';
import { AppConfigService } from './app-config.service';
import { TokenService } from './token.service';

/** Login errors.  */
export interface LoginErrors {

  /** Errors related to email. */
  readonly email?: string[];

  /** Errors related to password. */
  readonly password?: string[];
}

/** Registration errors. */
export interface RegistrationErrors {

  /** Errors related to email. */
  readonly email?: string[];

  /** Errors related to first name. */
  readonly firstName?: string[];

  /** Errors related to last name. */
  readonly lastName?: string[];

  /** Errors related to password. */
  readonly password?: string[];
}

/** Authorization service. */
@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly userUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    this.userUrl = new URL(`users/profile/`, config.apiUrl);
  }

  /**
   * Log In.
   * @param loginData Data required for login..
   */
  public login(loginData: LoginData): Observable<void | RegistrationErrors> {
    return this.authService.login(loginData).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(error.error.data as LoginErrors);
        }
        return throwError(() => error);
      }),
    );
  }

  /**
   * Registers an account.
   * @param registrationData Data required for registration.
   */
  public register(registrationData: RegistrationData): Observable<void | RegistrationErrors> {
    return this.authService.register(registrationData).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(error.error.data as RegistrationErrors);
        }
        return throwError(() => error);
      }),
    );
  }

  /** Requests to the server to get user profile.. */
  public fetchUser(): Observable<User | null> {
    return this.tokenService.get().pipe(
      switchMap(() => this.http.get<UserDto>(this.userUrl.toString())),
      map(userDto => UserMapper.fromDto(userDto)),
      catchError(() => of(null)),
    );
  }

  /** Log out. */
  public logout(): Observable<void> {
    return this.tokenService.remove();
  }
}
