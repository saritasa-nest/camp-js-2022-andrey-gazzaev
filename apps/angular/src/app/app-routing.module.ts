import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'catalog',
    pathMatch: 'full',
  },
  {
    path: 'catalog',
    loadChildren: () =>
      import('./features/table-view/table-view.module').then(
        m => m.TableViewModule,
      ),
  },
];

/** App routing module. */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
