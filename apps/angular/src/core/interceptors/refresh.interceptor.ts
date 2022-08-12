import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { AppConfigService } from '../services/app-config.service';
import { AuthService } from '../services/auth.service';

/** Refresh token interceptor. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  public constructor(
    private readonly config: AppConfigService,
    private readonly authService: AuthService,
  ) { }

  /** @inheritdoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status !== 401 || this.shouldRefreshTokenForUrl(request.url)) {
            return throwError(() => error);
          }

          return this.authService.refreshToken().pipe(
            switchMap(() => next.handle(request)),
          );
        }

        return throwError(() => error);
      }),
    );
  }

  private shouldRefreshTokenForUrl(url: string): boolean {
    return url.startsWith(
      new URL('auth', this.config.apiCampBaseUrl).toString(),
    );
  }
}
