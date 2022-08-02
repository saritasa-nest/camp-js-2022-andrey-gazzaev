import { catchError, map, Observable, of, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';

import { TokensService } from './tokens.service';
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
@Injectable()
export class AuthService {

  private readonly loginUrl: URL;

  private readonly registrationUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly tokensService: TokensService,
  ) {
    this.loginUrl = new URL(`auth/login/`, config.apiUrl);
    this.registrationUrl = new URL(`auth/register/`, config.apiUrl);
  }

  /**
   * Log In.
   * @param loginData Data required for login..
   */
  public login(loginData: LoginData): Observable<void | RegistrationErrors | undefined> {
    const loginDataDto = LoginDataMapper.toDto(loginData);
    return this.http.post<TokensDto>(this.loginUrl.toString(), loginDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokensService.save(tokens)),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(error.error.data as LoginErrors);
        }
        return of(void 0);
      }),
    );
  }

  /**
   * Registers an account.
   * @param registrationData Data required for registration.
   */
  public register(registrationData: RegistrationData): Observable<void | RegistrationErrors | undefined> {
    const registrationDataDto = RegistrationDataMapper.toDto(registrationData);
    return this.http.post<TokensDto>(this.registrationUrl.toString(), registrationDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokensService.save(tokens)),
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          return of(error.error.data as RegistrationErrors);
        }
        return of(void 0);
      }),
    );
  }
}
