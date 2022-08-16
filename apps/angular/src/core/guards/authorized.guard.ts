import { map, Observable } from 'rxjs';

import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

import { UserService } from '../services/user.service';

/**  Authorized guard. */
@Injectable({
  providedIn: 'root',
})
export class AuthorizedGuard implements CanActivate {

  public constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) { }

  /** @inheritdoc */
  public canActivate(): Observable<boolean | UrlTree> {
    return this.userService.isAuthorized$.pipe(
      map(isAuthorized => (isAuthorized ? true : this.router.parseUrl('/auth/login'))),
    );
  }
}
