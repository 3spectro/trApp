import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    PaginationComponent
  ],
  exports: [
    ConfirmationComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
