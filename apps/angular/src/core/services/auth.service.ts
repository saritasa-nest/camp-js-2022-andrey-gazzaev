import { catchError, map, Observable, switchMap, switchMapTo, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { AppError } from '@js-camp/core/models/app-error';
import { TokensMapper } from '@js-camp/core/mappers/token.mapper';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';

import { UrlService } from './url.service';
import { TokenService } from './token.service';
import { AppConfigService } from './app-config.service';

const UNAUTHORIZED_ERROR = 'User unauthorized';

/** Service providing the possibility of authorization.*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private readonly loginUrl: URL;

  private readonly registrationUrl: URL;

  private readonly refreshUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly urlService: UrlService,
    private readonly tokenService: TokenService,
  ) {
    this.loginUrl = new URL(`auth/login/`, config.apiUrl);
    this.refreshUrl = new URL(`auth/token/refresh/`, config.apiUrl);
    this.registrationUrl = new URL(`auth/register/`, config.apiUrl);
  }

  /**
   * Log in to account.
   * @param loginData Data required for login..
   */
  public login(loginData: LoginData): Observable<void> {
    const loginDataDto = LoginDataMapper.toDto(loginData);
    return this.http.post<TokenDto>(this.loginUrl.toString(), loginDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
    );
  }

  /**
   * Registers an account.
   * @param registrationData Data required for registration.
   */
  public register(registrationData: RegistrationData): Observable<void> {
    const registrationDataDto = RegistrationDataMapper.toDto(registrationData);
    return this.http.post<TokenDto>(this.registrationUrl.toString(), registrationDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
    );
  }

  /** Refresh tokens. */
  public refreshToken(): Observable<boolean | void> {
    return this.tokenService.get().pipe(
      switchMap(tokens => tokens !== null ?
        this.http.post<TokenDto>(this.refreshUrl.toString(), {
          refresh: tokens.refresh,
        }) :
        throwError(() => new AppError(UNAUTHORIZED_ERROR))),
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
      catchError((error: unknown) => {
        if (
          error instanceof AppError &&
          error.message === UNAUTHORIZED_ERROR
        ) {
          return throwError(() => error);
        }
        return this.tokenService.remove()
          .pipe(
            switchMapTo(this.urlService.navigateToLogin()),
          );
      }),
    );
  }

}
