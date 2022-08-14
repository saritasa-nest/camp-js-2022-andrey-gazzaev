import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

/** Select component. */
@Component({
  selector: 'app-simple-select',
  templateUrl: './simple-select.component.html',
  styleUrls: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimpleSelectComponent {

  /** Select label. */
  @Input()
  public label = '';

  /** */
  @Input()
  public formControlSelect = new FormControl<string>('');

  /** */
  @Input()
  public collection: readonly string[] = [];
}
