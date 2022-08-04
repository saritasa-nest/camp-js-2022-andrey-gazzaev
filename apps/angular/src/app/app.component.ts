import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

/** App component. */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  styleUrls: ['../theme/styles.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent { }
