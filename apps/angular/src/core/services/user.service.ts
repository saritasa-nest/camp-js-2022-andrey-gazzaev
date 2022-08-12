import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';

import { Injectable } from '@angular/core';

import { User } from '@js-camp/core/models/user';
import { Login } from '@js-camp/core/models/login';
import { UserDto } from '@js-camp/core/dtos/user.dto';
import { AppError } from '@js-camp/core/models/httpError';
import { UserMapper } from '@js-camp/core/mappers/user.mapper';
import { Registration } from '@js-camp/core/models/registration';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { catchHttpErrorResponse } from '../utils/rxjs/catch-http-error';

import { AuthService } from './auth.service';
import { TokenService } from './token.service';
import { AppConfigService } from './app-config.service';

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

  /** Current user. Null when user is not logged in. */
  public readonly currentUser$: Observable<User | null>;

  /** Is the user authorized. */
  public readonly isAuthorized$: Observable<boolean>;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
  ) {
    this.currentUser$ = this.fetchUser();
    this.isAuthorized$ = this.currentUser$.pipe(map(user => user !== null));
    this.userUrl = new URL(`users/profile/`, config.apiCampBaseUrl);
  }

  /**
   * Log in.
   * @param loginData Data required for login.
   */
  public login(loginData: Login): Observable<void> {
    return this.authService.login(loginData).pipe(
      catchHttpErrorResponse(error => throwError(() => this.createError(error))),
    );
  }

  /**
   * Registers user.
   * @param registrationData Data required for registration.
   */
  public register(registrationData: Registration): Observable<void> {
    return this.authService.register(registrationData).pipe(
      catchHttpErrorResponse(error => throwError(() => this.createError(error))),
    );
  }

  /**
   * Requests to the server to get user profile.
   * If an error occurs, the user will be null.
   * The error may be if the user is not authorized.
   */
  private fetchUser(): Observable<User | null> {
    return this.tokenService.token$.pipe(
      switchMap(() => this.http.get<UserDto>(this.userUrl.toString())),
      map(userDto => UserMapper.fromDto(userDto)),
      catchError((error: unknown) => {
        console.error(error);
        return of(null);
      }),
    );
  }

  /** Log out. */
  public logout(): Observable<void> {
    return this.tokenService.remove();
  }

  /**
   * Instantiates httpError with T errors.
   * @param error HTTP error response.
   */
  private createError<T>(error: HttpErrorResponse): AppError<T> {
    return new AppError<T>(
      error.error.data,
      error.error.detail,
    );
  }
}
