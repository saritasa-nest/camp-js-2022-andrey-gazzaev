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
}
