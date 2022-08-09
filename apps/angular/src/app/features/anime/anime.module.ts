import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeComponent } from './anime.component';
import { HeaderComponent } from './header/header.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';
import { ImagePopupComponent } from './details/image-popup/image-popup.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeComponent,
    HeaderComponent,
    DetailsComponent,
    TableViewComponent,
    ImagePopupComponent,
  ],
  imports: [
    SharedModule,
    AnimeRoutingModule,
  ],
})
export class AnimeModule { }
