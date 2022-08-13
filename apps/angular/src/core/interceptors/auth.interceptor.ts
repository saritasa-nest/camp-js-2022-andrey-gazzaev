import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { TokenService } from '../services/token.service';
import { AppConfigService } from '../services/app-config.service';

/** Request header names. */
enum HttpHeader {
  Authorization = 'Authorization',
}

/** Authentication interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(
    private readonly config: AppConfigService,
    private readonly tokensService: TokenService,
  ) { }

  /** @inheritdoc */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (this.shouldInterceptToken(request.url)) {
      return next.handle(request);
    }
    return this.tokensService.token$.pipe(
      map(tokens =>
        tokens !== null ?
          request.clone({
            headers: request.headers.set(HttpHeader.Authorization, `Bearer ${tokens.access}`),
          }) :
          request),
      switchMap(newReq => next.handle(newReq)),
    );
  }

  private shouldInterceptToken(url: string): boolean {
    const isS3Upload = url.startsWith(new URL('https://s3.us-west-2.amazonaws.com/camp-js-backend-files-dev').toString());
    const isAuthRequest = url.startsWith(
      new URL('auth', this.config.apiCampBaseUrl).toString(),
    );
    return isAuthRequest || isS3Upload;
  }
}
