import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { AiredDatePipe } from './pipes/aired-date.pipe';

/** Shared module. */
@NgModule({
  declarations: [PlaceholderPipe, AiredDatePipe],
  exports: [
    FormsModule,
    CommonModule,
    MatMenuModule,
    MatListModule,
    MatSortModule,
    MatIconModule,
    MatCardModule,
    AiredDatePipe,
    MatInputModule,
    MatTableModule,
    MatChipsModule,
    MatDialogModule,
    MatSelectModule,
    PlaceholderPipe,
    MatButtonModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatNativeDateModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    NgxMatFileInputModule,
    NgxMatSelectSearchModule,
    MatProgressSpinnerModule,
  ],
})
export class SharedModule { }
