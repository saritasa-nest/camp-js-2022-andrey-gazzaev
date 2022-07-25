import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { TableViewComponent } from './table-view.component';
import { TableViewRoutingModule } from './table-view-routing.module';

/** Table view module. */
@NgModule({
  declarations: [TableViewComponent],
  imports: [CommonModule, TableViewRoutingModule, MatTableModule],
})
export class TableViewModule { }
