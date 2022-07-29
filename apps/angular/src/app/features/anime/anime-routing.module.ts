import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TableViewComponent } from './table-view/table-view.component';

const routes: Routes = [
  {
    path: 'catalog',
    component: TableViewComponent,
    children: [],
  },
];

/** Anime routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AnimeRoutingModule {}
