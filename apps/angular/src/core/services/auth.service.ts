import { catchError, map, Observable, switchMap, switchMapTo, throwError } from 'rxjs';

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Login } from '@js-camp/core/models/login';
import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { httpError } from '@js-camp/core/models/http-error';
import { Registration } from '@js-camp/core/models/registration';
import { TokensMapper } from '@js-camp/core/mappers/token.mapper';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';

import { UrlService } from './url.service';
import { TokenService } from './token.service';
import { AppConfigService } from './app-config.service';

const UNAUTHORIZED_ERROR_MESSAGE = 'User unauthorized';

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
    this.loginUrl = new URL(`auth/login/`, config.apiCampBaseUrl);
    this.refreshUrl = new URL(`auth/token/refresh/`, config.apiCampBaseUrl);
    this.registrationUrl = new URL(`auth/register/`, config.apiCampBaseUrl);
  }

  /**
   * Log in to account.
   * @param loginData Data required for login..
   */
  public login(loginData: Login): Observable<void> {
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
  public register(registrationData: Registration): Observable<void> {
    const s3Url = 'https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev/';
    const filePathToAvatar = 'user_avatars%2Ff33c09a7-a15e-4b7c-b47f-650bfe19faff%2Fprofile.jpg';

    const avatarUrl = `${s3Url}${filePathToAvatar}`;
    const registrationDataDto = RegistrationDataMapper.toDto({ ...registrationData, avatarUrl });
    return this.http.post<TokenDto>(this.registrationUrl.toString(), registrationDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
    );
  }

  /** Refresh tokens. */
  public refreshToken(): Observable<boolean | void> {
    return this.tokenService.token$.pipe(
      switchMap(tokens => tokens !== null ?
        this.http.post<TokenDto>(this.refreshUrl.toString(), {
          refresh: tokens.refresh,
        }) :
        throwError(() => new httpError(UNAUTHORIZED_ERROR_MESSAGE))),
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
      catchError((error: unknown) => {
        if (
          error instanceof httpError &&
          error.message === UNAUTHORIZED_ERROR_MESSAGE
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
