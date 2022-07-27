import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { AnimeComponent } from './anime.component';
import { TableViewRoutingModule } from './anime-routing.module';
import { TableViewComponent } from './table-view/table-view.component';

/** Table view module. */
@NgModule({
  declarations: [AnimeComponent, TableViewComponent],
  imports: [
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    TableViewRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class AnimeModule { }
