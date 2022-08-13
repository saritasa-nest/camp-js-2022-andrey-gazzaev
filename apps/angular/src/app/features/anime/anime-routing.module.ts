import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from '../../../core/guards/authorized.guard';

import { AnimeComponent } from './anime.component';
import { DetailsComponent } from './details/details.component';
import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: AnimeComponent,
    children: [
      {
        path: '',
        component: TableViewComponent,
      },
      {
        path: ':id',
        component: DetailsComponent,
        canActivate: [AuthorizedGuard],
      },
    ],
  },

];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule { }
