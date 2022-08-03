import { Observable } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { ChangeDetectionStrategy, Component } from '@angular/core';

import { User } from '@js-camp/core/models/user';

import { UserService } from '../../../core/services/user.service';

/** Header component. */
@UntilDestroy()
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** User info. */
  public readonly user$: Observable<User | null>;

  public constructor(
    private readonly userService: UserService,
  ) {
    this.user$ = this.userService.fetchUser();
  }

  /** Log out from account. */
  public onLogout(): void {
    this.userService.logout()
      .pipe(
        untilDestroyed(this),
      )
      .subscribe();
  }
}
