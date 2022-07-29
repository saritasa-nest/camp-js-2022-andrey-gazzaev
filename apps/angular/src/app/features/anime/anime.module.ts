import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    FormsModule,
    CommonModule,
    SharedModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    AnimeRoutingModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class AnimeModule { }
