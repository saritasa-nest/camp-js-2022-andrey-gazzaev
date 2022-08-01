import { map, Observable, switchMap } from 'rxjs';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokensDto } from '@js-camp/core/dtos/tokens.dto';
import { LoginDataMapper } from '@js-camp/core/mappers/login-data.mapper';
import { TokensMapper } from '@js-camp/core/mappers/tokens.mapper';
import { LoginData } from '@js-camp/core/utils/interfaces/auth.interface';

import { AppConfigService } from './app-config.service';
import { TokensService } from './tokens.service';

/** Authorization service. */
@Injectable()
export class AuthService {

  private readonly loginUrl: URL;

  public constructor(
    config: AppConfigService,
    private readonly http: HttpClient,
    private readonly tokensService: TokensService,
  ) {
    this.loginUrl = new URL(`auth/login/`, config.apiUrl);
  }

  /**
   * Log In.
   * @param loginData Log In data.
   */
  public login(loginData: LoginData): Observable<void> {
    const loginDataDto = LoginDataMapper.toDto(loginData);
    return this.http.post<TokensDto>(this.loginUrl.toString(), loginDataDto).pipe(
      map(tokensDto => TokensMapper.fromDto(tokensDto)),
      switchMap(tokens => this.tokensService.save(tokens)),
    );
  }
}
