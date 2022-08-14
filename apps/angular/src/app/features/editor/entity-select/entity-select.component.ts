import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Entity {

  /** ID. */
  id: number;

  /** Name. */
  name: string;
}

/** Entity select component. */
@Component({
  selector: 'app-entity-select',
  templateUrl: './entity-select.component.html',
  styleUrls: [],
})
export class EntitySelectComponent {

  /** Entities to be displayed in the selector. */
  @Input()
  public entities: readonly Entity[] = [];

  /** Selector label. */
  @Input()
  public selectorLabel = '';

  /** Entities name. */
  @Input()
  public entitiesName = '';

  /** Form control entities. */
  @Input()
  public formControlEntities = new FormControl<readonly number[]>([]);

  /** Form control search entity. */
  @Input()
  public formControlSearchEntity = new FormControl<string>('');

  /** Emitter entity create. */
  @Output()
  public createEntity = new EventEmitter();

  /** Emitter entity remove. */
  @Output()
  public removeEntity = new EventEmitter<number>();

  /** Emitter more entity. */
  @Output()
  public moreEntities = new EventEmitter();

  /** Handlers entity create. */
  public onCreateEntity(): void {
    this.createEntity.emit();
  }

  /**
   * Handlers entity remove.
   * @param id Entity ID.
   */
  public onRemoveEntity(id: number): void {
    this.removeEntity.emit(id);
  }

  /** Handlers more entities get. */
  public onMoreEntities(): void {
    this.moreEntities.emit();
  }

  /**
   * Checks if the search string is empty.
   * @param string Some string.
   */
  public isStringEmpty(string: string | null): boolean {
    return string === null || string.length === 0;
  }
}
