import { Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';

import { AppConfigService } from '../services/app-config.service';

/** Request header names. */
enum HttpHeader {
  ApiKey = 'Api-Key',
}

/** Interceptor to add API key to headers. */
@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  public constructor(private readonly config: AppConfigService) { }

  /**
   * Appends API key.
   * @inheritdoc
   */
  public intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const requestClone = request.clone({
      headers: request.headers.set(HttpHeader.ApiKey, this.config.apiCampKey),
    });
    return next.handle(requestClone);
  }
}
