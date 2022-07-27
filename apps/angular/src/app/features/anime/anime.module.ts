import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { PlaceholderPipe } from '../../../shared/pipes/placeholder.pipe';

import { AnimeComponent } from './anime.component';
import { AnimeRoutingModule } from './anime-routing.module';
import { TableViewComponent } from './table-view/table-view.component';

/** Anime module. */
@NgModule({
  declarations: [AnimeComponent, TableViewComponent, PlaceholderPipe],
  imports: [
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    AnimeRoutingModule,
    AnimeRoutingModule,
    MatProgressSpinnerModule,
  ],
})
export class AnimeModule { }
