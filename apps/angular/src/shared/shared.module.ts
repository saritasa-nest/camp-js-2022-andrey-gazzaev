import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderPipe } from './pipes/placeholder.pipe';

/** Shared module. */
@NgModule({
  declarations: [PlaceholderPipe],
  exports: [PlaceholderPipe],
  imports: [CommonModule],
})
export class SharedModule { }
