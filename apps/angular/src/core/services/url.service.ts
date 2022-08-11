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
   * @param urlSearchParams Url query params.
   */
  public setUrl(urlSearchParams: URLSearchParams): void {
    const queryParams: Params = {};

    for (const [key, value] of urlSearchParams.entries()) {
      queryParams[key] = value;
    }

    this.router.navigate([], {
      relativeTo: this.route,
      queryParams,
      queryParamsHandling: 'merge',
    });
  }
}
