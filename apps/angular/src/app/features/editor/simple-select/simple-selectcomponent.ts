import { ChangeDetectionStrategy, Component, Input, TrackByFunction } from '@angular/core';
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

  /** Form control select. */
  @Input()
  public formControlSelect = new FormControl<string>('');

  /** Some collection. */
  @Input()
  public collection: readonly string[] = [];

  /**
   * Tracks item.
   * @param _index Anime's index into array.
   * @param item Object of item.
   */
  public trackItemItem: TrackByFunction<string> = function(_index: number, item: string): string {
    return item;
  };
}
