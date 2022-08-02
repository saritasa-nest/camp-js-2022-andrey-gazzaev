import { Observable, switchMap } from 'rxjs';
import { ChangeDetectionStrategy, Component } from '@angular/core';

import { User } from '@js-camp/core/models/user';

import { UserService } from '../../../core/services/user.service';
import { TokensService } from '../../../core/services/tokens.service';

/** Header component. */
@Component({
  selector: 'camp-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent {

  /** User info. */
  public readonly user$: Observable<User>;

  public constructor(
    private readonly userService: UserService,
    private readonly tokensService: TokensService,
  ) {

    this.user$ = this.tokensService.get().pipe(
      switchMap(() => this.userService.fetchUser()),
    );
  }

}
