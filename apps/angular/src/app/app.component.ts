import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** App component. */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: [
    '../theme/styles.css',
    '../theme/css-reset.css',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,

  // It is necessary to apply css-reset.css.
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent { }
