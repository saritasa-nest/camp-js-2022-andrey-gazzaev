import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthorizedGuard } from '../../../core/guards/authorized.guard';

import { EditorComponent } from './editor.component';
import { EditorFormComponent } from './editor-form/editor-form.component';

const routes: Routes = [
  {
    path: '',
    component: EditorComponent,
    canActivate: [AuthorizedGuard],
    children: [
      {
        path: '',
        component: EditorFormComponent,
      },
      {
        path: ':id',
        component: EditorFormComponent,
      },
    ],
  },
];

/** Editor routing module. */
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditorRoutingModule { }
