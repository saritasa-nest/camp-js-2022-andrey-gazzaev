import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

/** URL service. */
@Injectable({
  providedIn: 'root',
})
export class UrlService {

  public constructor(
    private readonly router: Router,
  ) { }

  /** Navigate to login page. */
  public navigateToLogin(): Promise<boolean> {
    return this.router.navigate(['/auth/login']);
  }

  /** Navigate to home page. */
  public navigateToHome(): Promise<boolean> {
    return this.router.navigate(['/catalog']);
  }

  /**
   * Navigate to details page.
   * @param id Page id.
   */
  public navigateToDetails(id: number): Promise<boolean> {
    return this.router.navigate(['/catalog', id]);
  }
}
