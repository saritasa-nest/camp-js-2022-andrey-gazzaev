import { catchError, map, Observable, switchMap, tap, throwError } from 'rxjs';

import { Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { TokenDto } from '@js-camp/core/dtos/token.dto';
import { TokensMapper } from '@js-camp/core/mappers/token.mapper';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { RegistrationDataMapper } from '@js-camp/core/mappers/registration-data.mapper';
import { LoginData, RegistrationData } from '@js-camp/core/utils/interfaces/auth.interface';

import { TokenService } from './token.service';
import { AppConfigService } from './app-config.service';

/** Authorization service.*/
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly loginUrl: URL;

  private readonly registrationUrl: URL;

  private readonly refreshUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly router: Router,
    private readonly http: HttpClient,
    private readonly tokenService: TokenService,
  ) {
    this.loginUrl = new URL(`auth/login/`, config.apiUrl);
    this.refreshUrl = new URL(`auth/token/refresh/`, config.apiUrl);
    this.registrationUrl = new URL(`auth/register/`, config.apiUrl);
  }

  /**
   * Log In.
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
  public refreshToken(): Observable<void> {
    return this.tokenService.get().pipe(
      switchMap(tokens => tokens !== null ? this.http.post<TokenDto>(this.refreshUrl.toString(), {
        refresh: tokens.refresh,
      }) : throwError(() => new Error('Unauthorized'))),
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokenService.save(tokens)),
      catchError((error: unknown) => {
        if (error instanceof Error && error.message === 'Unauthorized') {
          return throwError(() => new Error('Unauthorized'));
        }
        return this.tokenService.remove()
          .pipe(
            tap(() => this.router.navigate(['/auth/login'])),
          );
      }),
    );
  }
}
