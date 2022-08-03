import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpInterceptor,
  HttpErrorResponse,
} from '@angular/common/http';
import { Injectable } from '@angular/core';

import { UserService } from '../services/user.service';
import { AppConfigService } from '../services/app-config.service';

/** Refresh token interceptor. */
@Injectable()
export class RefreshInterceptor implements HttpInterceptor {

  public constructor(
    private readonly config: AppConfigService,
    private readonly userService: UserService,
  ) { }

  /** @inheritdoc */
  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler,
  ): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError((error: unknown) => {
        if (error instanceof HttpErrorResponse) {
          if (error.status !== 401 || request.url.startsWith(new URL('auth', this.config.apiUrl).toString())) {
            return throwError(() => error);
          }

          return this.userService.refreshToken().pipe(
            switchMap(() => next.handle(request)),
          );
        }

        return throwError(() => error);
      }),
    );
  }
}
