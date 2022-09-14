import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { IEventType, EventsService, IWayToTravel } from './../../../../../../shared/services/events.service';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-specific-data',
  templateUrl: './specific-data.component.html',
  styleUrls: ['./specific-data.component.css']
})
export class SpecificDataComponent implements OnInit {
  @Output() back: EventEmitter<void> = new EventEmitter<void>();
  @Output() save: EventEmitter<void> = new EventEmitter<void>();
  types: IEventType[] = [];
  typeSelected!: IEventType;
  noTypeSelected: IEventType = {
    id: -1,
    type: '.:Select:.'
  }

  waysToTravel: IWayToTravel[] = [];
  wayToTravelSelected!: IWayToTravel;
  noWayToTravelSelected: IWayToTravel = {
    code: '-1',
    value: '.:Select:.'
  }

  travelForm!: FormGroup;
  accomodationForm!: FormGroup;

  keyword = 'name';
  countries = [
    {
      id: 1,
      name: 'Albania',
    },
    {
      id: 2,
      name: 'Belgium',
    },
    {
      id: 3,
      name: 'Denmark',
    },
    {
      id: 4,
      name: 'Montenegro',
    },
    {
      id: 5,
      name: 'Turkey',
    },
    {
      id: 6,
      name: 'Ukraine',
    },
    {
      id: 7,
      name: 'Macedonia',
    },
    {
      id: 8,
      name: 'Slovenia',
    },
    {
      id: 9,
      name: 'Georgia',
    },
    {
      id: 10,
      name: 'India',
    },
    {
      id: 11,
      name: 'Russia',
    },
    {
      id: 12,
      name: 'Switzerland',
    },
    {
      id: 13,
      name: 'Argentina',
    },
  ];
  cities = [

  ]

  constructor(
    private readonly fb: FormBuilder,
    private readonly service : EventsService
  ) {
    this.initTravelForm();
  }

  private initTravelForm() {
    this.travelForm = this.fb.group({
      wayToTravel: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.loadEventTypes();
    this.loadWaysToTravel();
  }

  private loadEventTypes(): void {
    this.types = this.service.getEventTypes();
    this.typeSelected =  this.noTypeSelected;
  }

  private loadWaysToTravel(): void {
    this.waysToTravel = this.service.getWayToTravel();
    this.wayToTravelSelected =  this.noWayToTravelSelected;
  }

  selectEvent(item: any) {
    // do something with selected item
  }

  onSubmit(): void {

  }

  goBack(): void {
    this.back.emit();
  }
}
