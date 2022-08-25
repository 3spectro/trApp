import { GuestsRoutingModule } from './guests-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { GuestSideBarComponent } from './guest-side-bar/guest-side-bar.component';

@NgModule({
  declarations: [
    IndexComponent,
    GuestSideBarComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    GuestsRoutingModule
  ],
  providers: []
})
export class GuestsModule { }
