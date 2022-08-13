import { Directive, HostListener } from '@angular/core';

/**  Click stop propagation directive. */
@Directive({
  selector: '[click-stop-propagation]',
})
export class ClickStopPropagationDirective {

  /**
   * Stops propagation.
   * @param event Event of element.
   */
  @HostListener('click', ['$event'])
  public onClick(event: Event): void {
    event.stopPropagation();
  }
}
