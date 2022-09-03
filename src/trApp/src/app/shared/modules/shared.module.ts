import { IndexBaseComponent } from './../classes/index-base.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent
  ],
  exports: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
