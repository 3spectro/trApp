import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DisableControlDirective } from './../directives/disabled-control.directive';
import { TranslateModule } from '@ngx-translate/core';
import { IndexBaseComponent } from '../components/index-base/index-base.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ConfirmationComponent } from '../components/modals/confirmation/confirmation.component';
import { PaginationComponent } from '../components/pagination/pagination.component';
import { SideBarBaseComponent } from '../components/side-bar-base/side-bar-base.component';
import { GuestGridComponent } from '../components/guest-grid/guest-grid.component';
import { DateRangeFormComponent } from '../components/date-range-form/date-range-form.component';

@NgModule({
  declarations: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent,
    SideBarBaseComponent,
    GuestGridComponent,
    DateRangeFormComponent,
    DisableControlDirective
  ],
  exports: [
    ConfirmationComponent,
    PaginationComponent,
    IndexBaseComponent,
    SideBarBaseComponent,
    GuestGridComponent,
    DateRangeFormComponent,
    DisableControlDirective,
    TranslateModule,
  ],
  imports: [
    CommonModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
})
export class SharedModule { }
