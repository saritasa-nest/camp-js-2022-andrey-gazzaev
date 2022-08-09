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

import { PlaceholderPipe } from './pipes/placeholder.pipe';

/** Shared module. */
@NgModule({
  declarations: [PlaceholderPipe],
  exports: [
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatSortModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    PlaceholderPipe,
    MatButtonModule,
    MatCheckboxModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule { }
