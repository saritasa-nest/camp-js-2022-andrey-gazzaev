import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AnimeComponent } from './anime.component';

import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  {
    path: '',
    component: AnimeComponent,
    children: [
      {
        path: '',
        component: TableViewComponent,
      },
    ],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
