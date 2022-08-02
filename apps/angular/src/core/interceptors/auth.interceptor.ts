import { map, Observable, switchMap } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { TokensService } from '../services/tokens.service';

/** Request header names. */
enum HttpHeader {
  Authorization = 'Authorization',
}

/** Authentication interceptor. */
@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  public constructor(private readonly tokensService: TokensService) { }

  /** @inheritdoc */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.tokensService.get().pipe(
      map(tokens =>
        tokens !== null ?
          request.clone({
            headers: request.headers.set(HttpHeader.Authorization, tokens.access),
          }) :
          request),
      switchMap(newReq => next.handle(newReq)),
    );
  }
}
