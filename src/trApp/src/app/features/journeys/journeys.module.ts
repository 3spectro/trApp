import { JourneysRoutingModule } from './journeys-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';
import { IndexComponent } from './index/index.component';
import { JouernySideBarComponent } from './journey-side-bar/journey-side-bar.component';
import { DetailComponent } from './detail/detail.component';
import { HeaderComponent } from './detail/header/header.component';
import { ItineraryComponent } from './detail/itinerary/itinerary.component';
import { TravelersComponent } from './detail/travelers/travelers.component';
import { ReservationCodeComponent } from './modals/reservation-code/reservation-code.component';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    IndexComponent,
    JouernySideBarComponent,
    DetailComponent,
    HeaderComponent,
    ItineraryComponent,
    TravelersComponent,
    ReservationCodeComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    JourneysRoutingModule,
    ClipboardModule,
    GoogleMapsModule,
    HttpClientModule,
    HttpClientJsonpModule,
  ]
})
export class JourneysModule { }
