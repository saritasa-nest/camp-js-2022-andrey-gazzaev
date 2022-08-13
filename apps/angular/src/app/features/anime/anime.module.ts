import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeComponent } from './anime.component';
import { HeaderComponent } from './header/header.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { EditorComponent } from './editor/editor.component';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ImagePopupComponent } from './details/image-popup/image-popup.component';
import { SelectComponent } from './select/select.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeComponent,
    HeaderComponent,
    EditorComponent,
    DetailsComponent,
    TableViewComponent,
    ImagePopupComponent,
    SelectComponent,
  ],
  imports: [
    SharedModule,
    AnimeRoutingModule,
  ],

  // MatDialogRef and MAT_DIALOG_DATA must be provided for the popup to work.
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: {} },
  ],
})
export class AnimeModule {}
