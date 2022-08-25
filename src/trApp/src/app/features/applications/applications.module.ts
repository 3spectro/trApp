import { SharedModule } from '../../shared/modules/shared.module';
import { ApplicationsRoutingModule } from './applitacions-routing.module';
import { NgModule } from '@angular/core';
import { ApplicationSideBarComponent } from './application-side-bar/application-side-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';


@NgModule({
  declarations: [
    ApplicationSideBarComponent,
    IndexComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    ApplicationsRoutingModule,
  ],
  providers: []
})
export class ApplicationsModule { }
