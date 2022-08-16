import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

/** Custom date pipe. */
@Pipe({
  name: 'airedDate',
})
export class AiredDatePipe implements PipeTransform {

  /**
   * Converts an date to "dd.MM.YYYY" format.
   * @param date Date.
   */
  public transform(date: Date | null): string | null {
    if (date === null) {
      return null;
    }

    const format = 'dd.MM.YYYY';
    date.setDate(date.getDate());
    return new DatePipe('en-US').transform(date, format);
  }

}
