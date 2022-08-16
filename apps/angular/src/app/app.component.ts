import { ChangeDetectionStrategy, Component } from '@angular/core';

/** App component. */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: [
    '../theme/styles.css',
    '../theme/css-reset.css',
  ],
})
export class AppComponent { }
