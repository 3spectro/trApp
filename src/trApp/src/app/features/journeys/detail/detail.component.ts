import { Component, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { MapDirectionsService } from '@angular/google-maps';

const NAME = 'Event';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent {

  /*apiLoaded$!: Observable<boolean>;

  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;
  markerOptions: google.maps.MarkerOptions = {draggable: false};
  markerPositions: google.maps.LatLngLiteral[] = [];

  bsAsMarkerPosition: google.maps.LatLngLiteral = {
    lat: -34.61334346921281,
    lng: -58.39039856098662
  }
  amsterdamMarkerPosition: google.maps.LatLngLiteral = {
    lat: 48.84488056728545,
    lng: 2.344654128921971
  }
  barcelonaMarkerPosition: google.maps.LatLngLiteral = {
    lat: 41.55693994516527,
    lng: 2.2129758326243265
  }
  athenasMarkerPosition: google.maps.LatLngLiteral = {
    lat: 37.972359818552,
    lng: 23.718570144518278
  }

  vertices: google.maps.LatLngLiteral[] = [
    {lat: 48.84488056728545, lng: 2.344654128921971},
    {lat: 41.55693994516527, lng: 2.2129758326243265},
    {lat: 37.972359818552, lng: 23.718570144518278},
  ];

  ngAfterViewInit(): void {
    this.markerPositions.push(this.bsAsMarkerPosition);
    this.markerPositions.push(this.amsterdamMarkerPosition);
    this.markerPositions.push(this.barcelonaMarkerPosition);
    this.markerPositions.push(this.athenasMarkerPosition);
  }

  addMarker(event: google.maps.MapMouseEvent) {
    const latLng = (event?.latLng as google.maps.LatLng);
    this.markerPositions.push(latLng.toJSON());
  }*/
  center: google.maps.LatLngLiteral = {lat: 24, lng: 12};
  zoom = 4;

  readonly directionsResults$: Observable<google.maps.DirectionsResult|undefined>;

  constructor(mapDirectionsService: MapDirectionsService) {
    const request: google.maps.DirectionsRequest = {
      destination: {lat: 37.972359818552, lng: 23.718570144518278},
      origin: {lat: 41.55693994516527, lng: 2.2129758326243265},
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsResults$ = mapDirectionsService.route(request).pipe(map(response => response.result));
  }

}
