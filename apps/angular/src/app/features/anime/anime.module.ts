import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeComponent } from './anime.component';
import { TableViewRoutingModule } from './anime-routing.module';
import { TableViewComponent } from './table-view/table-view.component';

/** Table view module. */
@NgModule({
  declarations: [AnimeComponent, TableViewComponent],
  imports: [
    CommonModule,
    MatTableModule,
    TableViewRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class AnimeModule { }
