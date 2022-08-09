import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

interface ImageData {

  /** Image name. */
  readonly name: string;

  /** Image URL. */
  readonly url: string;
}

/**  */
@Component({
  selector: 'app-image-popup',
  templateUrl: './image-popup.component.html',
  styleUrls: ['./image-popup.component.css'],
})
export class ImagePopupComponent {

  /** @inheritdoc */
  public constructor(@Inject(MAT_DIALOG_DATA) public data: ImageData) { }

}
