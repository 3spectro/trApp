import { JourneysRoutingModule } from './journeys-routing.module';
import { SharedModule } from './../../shared/modules/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
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
import { EventSideBarComponent } from './detail/itinerary/event-side-bar/event-side-bar.component';
import { GenericDataComponent } from './detail/itinerary/event-side-bar/generic-data/generic-data.component';
import { SpecificDataComponent } from './detail/itinerary/event-side-bar/specific-data/specific-data.component';
import { AutocompleteLibModule } from 'angular-ng-autocomplete';


@NgModule({
  declarations: [
    IndexComponent,
    JouernySideBarComponent,
    DetailComponent,
    HeaderComponent,
    ItineraryComponent,
    TravelersComponent,
    ReservationCodeComponent,
    EventSideBarComponent,
    GenericDataComponent,
    SpecificDataComponent
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
    FormsModule,
    AutocompleteLibModule
  ]
})
export class JourneysModule { }
