import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { EditorComponent } from './editor.component';
import { SimpleSelectComponent } from './simple-select/simple-selectcomponent';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorFormComponent } from './editor-form/editor-form.component';
import { EntitySelectComponent } from './entity-select/entity-select.component';

/** Editor module. */
@NgModule({
  declarations: [
    EditorComponent,
    SimpleSelectComponent,
    EditorFormComponent,
    EntitySelectComponent,
  ],
  imports: [SharedModule, EditorRoutingModule],
})
export class EditorModule {}
