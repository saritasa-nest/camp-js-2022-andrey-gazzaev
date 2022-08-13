import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { EditorComponent } from './editor.component';
import { SelectComponent } from './select/select.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorFormComponent } from './editor-form/editor-form.component';

/** Editor module. */
@NgModule({
  declarations: [
    EditorComponent,
    SelectComponent,
    EditorFormComponent,
  ],
  imports: [
    SharedModule,
    EditorRoutingModule,
  ],
})
export class EditorModule { }
