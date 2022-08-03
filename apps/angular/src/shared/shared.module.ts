import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { UserService } from '../core/services/user.service';

import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { HeaderComponent } from './components/header/header.component';

/** Shared module. */
@NgModule({
  declarations: [PlaceholderPipe, HeaderComponent],
  exports: [PlaceholderPipe, HeaderComponent],
  imports: [CommonModule, RouterModule],
  providers: [UserService],
})
export class SharedModule { }
