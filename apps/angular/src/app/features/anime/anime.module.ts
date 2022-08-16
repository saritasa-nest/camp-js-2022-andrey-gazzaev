import { NgModule } from '@angular/core';

import { SharedModule } from '../../../shared/shared.module';

import { AnimeComponent } from './anime.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { TableViewComponent } from './table-view/table-view.component';

/** Anime module. */
@NgModule({
  declarations: [
    AnimeComponent,
    TableViewComponent,
  ],
  imports: [
    SharedModule,
    AnimeRoutingModule,
  ],
})
export class AnimeModule { }
