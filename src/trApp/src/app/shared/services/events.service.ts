import { WayToTravel } from './../domain/enums/way-to-travel.enum';
import { EventType } from './../domain/enums/event-type.enum';
import { IApiResponse } from './../domain/core.entity';
import { Observable, timer, of } from 'rxjs';
import { LoadingBarService } from './loading-bar.service';
import { IGuest } from './guests.service';
import { IApplication } from './applications.service';
import { Injectable } from '@angular/core';
import { TravelType } from '../domain/enums/travel-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  items: IEvent[] = []
  event!: IEvent;

  constructor(
    private readonly loadingBarService: LoadingBarService
  ) {
    const travel1 = new Travel(
      1,
      1,
      {
        id: 3,
        name: 'Despegar',
        url: 'https://www.despegar.com.ar/'
      },
      new Date('November 1, 2022'),
      new Date('November 2, 2022'),
      85,
      'LZGH02',
      'Buenos Aires, Argentina',
      'Amsterdam, Netherlands',
      11,
      TravelType.FLY.toString()
    );
    const acc1 = new Accomodation(
      2,
      2,
      {
        id: 1,
        name: 'Booking',
        url: 'https://www.booking.com/'
      },
      new Date('November 2, 2022'),
      new Date('November 3, 2022'),
      120,
      'HMCAYEQ5T9',
      'Amsterdam',
      'Netherlands',
      'Real de Azua 3782',
      120);
      const travel2 = new Travel(
        3,
        1,
        {
          id: 3,
          name: 'Despegar',
          url: 'https://www.despegar.com.ar/'
        },
        new Date('November 3, 2022'),
        new Date('November 3, 2022'),
        32,
        'LZGH02',
        'Amsterdam, Netherlands',
        'Barcelona, Spain',
        28,
        TravelType.BUS.toString()
      );
      const acc2 = new Accomodation(
        4,
        2,
        {
          id: 1,
          name: 'Booking',
          url: 'https://www.booking.com/'
        },
        new Date('November 3, 2022'),
        new Date('November 7, 2022'),
        120,
        'HMCAYEQ5T9',
        'Barcelona',
        'Spain',
        'Real de Azua 3782',
        30);
    this.items.push(travel1);
    this.items.push(acc1);
    this.items.push(travel2);
    this.items.push(acc2);
  }

  get$ = (): Observable<IApiResponse<IEvent[]>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    return of({
      status: 200,
      message: undefined,
      value: this.items,
    });
  }

  delete$ = (id: number): Observable<IApiResponse<null>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    this.items = this.items.filter(x => x.id !== id);
    return of({
      status: 200,
      message: undefined,
      value: null
    });
  }

  update$ = (item: IEvent): Observable<IApiResponse<IEvent>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const index = this.items.findIndex(x => x.id === item.id);
    this.items[index] = item;
    return of({
      status: 200,
      message: undefined,
      value: item,
    });
  }

  save$ = (item: IEvent): Observable<IApiResponse<IEvent>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const response: IApiResponse<IEvent> = {
      status: 201,
      message: undefined,
      value: {} as IEvent,
    }
    item.id = this.items.length;
    response.value = item;
    return of(response);
  }

  getEventTypes(): IEventType[] {
    return [
      {
        id: EventType.TRAVEL,
        type: 'Travel'
      },
      {
        id: EventType.ACCOMODATION,
        type: 'Accomodation'
      },
    ]
  }

  getWayToTravel(): IWayToTravel[] {
    return [
      {
        code: WayToTravel.FLY,
        value: WayToTravel.FLY,
      },
      {
        code: WayToTravel.BUS,
        value: WayToTravel.BUS,
      },
      {
        code: WayToTravel.CAR,
        value: WayToTravel.CAR,
      }
    ]
  }

}

export interface IEvent {
  id: number;
  type?: number;
  subtype?: string;
  app: IApplication;
  dateFrom: Date;
  dateTo: Date;
  price: number;
  reservationCode: string;

  getDescription(): string;

  // UI Properites
  highLight?: boolean;
}

export class Accomodation implements IEvent {
  constructor(
    public id: number,
    public type: number,
    public app: IApplication,
    public dateFrom: Date,
    public dateTo: Date,
    public price: number,
    public reservationCode: string,
    public countyr: string,
    public city: string,
    public address: string,
    public totalPrice: number,
    public guests?: IGuest[]
  ) {}

  getDescription(): string {
    return `${this.countyr}, ${this.city}`;
  }
}

export class Travel implements IEvent {

  constructor(
    public id: number,
    public type: number,
    public app: IApplication,
    public dateFrom: Date,
    public dateTo: Date,
    public price: number,
    public reservationCode: string,
    public departure: string,
    public arrive: string,
    public duration: number,
    public subtype?: string,
  ) {}

  getDescription(): string {
    return `Fly from ${this.departure} to ${this.arrive}`;
  }
}

export interface IEventType {
  id: number;
  type: string;
}

export interface IWayToTravel {
  code: string;
  value: string;
}
