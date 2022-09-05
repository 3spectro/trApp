import { IndexBaseComponent } from '../components/index-base/index-base.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { SideBarBaseComponent } from '../components/side-bar-base/side-bar-base.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent,
    SideBarBaseComponent
  ],
  exports: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent,
    SideBarBaseComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [],
})
export class SharedModule { }
