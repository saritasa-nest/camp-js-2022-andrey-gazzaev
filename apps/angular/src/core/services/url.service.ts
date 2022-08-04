import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

/** URL service. */
@Injectable({
  providedIn: 'root',
})
export class UrlService {

  public constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
  ) { }

  /**
   * Sets new query params in url.
   * @param httpParams Http params.
   */
  public setUrl(httpParams: HttpParams): void {
    const query = httpParams.toString();
    const queryParams: Params = {};

    query.split('&').forEach(param => {
      const [key, value] = param.split('=');
      queryParams[key] = value;
    });

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
