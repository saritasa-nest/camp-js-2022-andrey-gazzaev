import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

interface CollectionItem {

  /** ID. */
  id: string | number;

  /** Item name. */
  name: string;
}

/** Select component. */
@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectComponent {

  /** Select label. */
  @Input()
  public label = '';

  /**  */
  @Input()
  public placeholder = '';

  /**  */
  @Input()
  public isMultiple = false;

  /** */
  @Input()
  public selectControl: FormControl = new FormControl<number[] | string[]>([]);

  /** */
  @Input()
  public collection: readonly CollectionItem[] = [];
}
