import { ChangeDetectionStrategy, Component } from '@angular/core';

/** App component. */
@Component({
  selector: 'app',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent { }
