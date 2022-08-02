import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlaceholderPipe } from './pipes/placeholder.pipe';
import { HeaderComponent } from './components/header/header.component';
import { UserService } from '../core/services/user.service';
import { RouterModule } from '@angular/router';

/** Shared module. */
@NgModule({
  declarations: [PlaceholderPipe, HeaderComponent],
  exports: [PlaceholderPipe, HeaderComponent],
  imports: [CommonModule, RouterModule],
  providers: [UserService],
})
export class SharedModule { }
