import { ChangeDetectionStrategy, Component } from '@angular/core';

/** App component. */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [
    '../theme/styles.css',
    '../theme/css-reset.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
