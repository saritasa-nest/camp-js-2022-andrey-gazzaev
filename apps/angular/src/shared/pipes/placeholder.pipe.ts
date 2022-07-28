import { Pipe, PipeTransform } from '@angular/core';

/** Placeholder pipe.  */
@Pipe({
  name: 'placeholder',
})
export class PlaceholderPipe implements PipeTransform {

  /**
   * Converts an empty value to '-'.
   * @param value Some string.
   */
  public transform(value: string | null): string {
    return value !== null && value !== '' ? value : '-';
  }

}
