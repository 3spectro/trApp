import { IGuest } from './guests.service';
import { LoadingBarService } from './loading-bar.service';
import { Injectable } from '@angular/core';
import { of, Observable, timer } from 'rxjs';
import { IApiResponse } from '../domain/core.entity';

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  items: IJourney[] = [
    {
      id: 1,
      name: 'Europa 2018',
      startDate: new Date('May 17, 2018'),
      endDate: new Date('July 20, 2018'),
      guests: [
        {
          id: 1,
          firstName: 'Esteban',
          lastName: 'Reynoso',
          passport: 'AAE988238',
          email: 'ereynoso.931@gmail.com',
          celPhone: '+5493513996282'
        },
        {
          id: 2,
          firstName: 'Marcos',
          lastName: 'Savy',
          passport: 'AAF365149',
          email: 'ereynoso.931@gmail.com',
          celPhone: '+5493513678532'
        }
      ],
    }
  ];

  constructor(
    private readonly loadingBarService: LoadingBarService
  ) { }

  get$ = (): Observable<IApiResponse<IJourney[]>> => {
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

  update$ = (item: IJourney): Observable<IApiResponse<IJourney>> => {
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

  save$ = (item: IJourney): Observable<IApiResponse<IJourney>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const response: IApiResponse<IJourney> = {
      status: 201,
      message: undefined,
      value: {} as IJourney,
    }
    item.id = this.items.length;
    response.value = item;
    return of(response);
  }
}

export interface IJourney {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
  guests?: IGuest[];
}
