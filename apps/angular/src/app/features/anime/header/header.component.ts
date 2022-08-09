import { Observable, tap } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { User } from '@js-camp/core/models/user';

import { UrlService } from '../../../../core/services/url.service';
import { UserService } from '../../../../core/services/user.service';

/** The main component of header on an anime page. */
@UntilDestroy()
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** User information. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly userService: UserService,
    private readonly urlService: UrlService,
  ) {
    this.user$ = this.userService.fetchUser();
  }

  /** Log out from account. */
  public onLogout(): void {
    this.userService.logout()
      .pipe(
        tap(() => this.urlService.navigateToHome()),
        untilDestroyed(this),
      )
      .subscribe();
  }
}
