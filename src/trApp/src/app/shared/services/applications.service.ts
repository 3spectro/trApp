import { LoadingBarService } from './loading-bar.service';
import { Injectable } from '@angular/core';
import { of, Observable, timer } from 'rxjs';
import { IApiResponse } from '../domain/core.entity';

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  items: IApplication[] = [
    {
      id: 1,
      name: 'Booking',
      url: 'https://www.booking.com/'
    },
    {
      id: 2,
      name: 'Arbnb',
      url: 'https://www.airbnb.com.ar/'
    },
    {
      id: 3,
      name: 'Despegar',
      url: 'https://www.despegar.com.ar/'
    }
  ];

  constructor(
    private readonly loadingBarService: LoadingBarService
  ) { }

  get$ = (): Observable<IApiResponse<IApplication[]>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    return of({
      status: 200,
      message: 'success',
      value: this.items,
    });
  }

  delete$ = (id: number): Observable<IApiResponse<null>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    this.items = this.items.filter(x => x.id !== id);
    return of({
      status: 200,
      message: 'success',
      value: null
    });
  }

  update$ = (item: IApplication): Observable<IApiResponse<IApplication>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const index = this.items.findIndex(x => x.id === item.id);
    this.items[index] = item;
    return of({
      status: 200,
      message: 'success',
      value: item,
    });
  }

  save$ = (item: IApplication): Observable<IApiResponse<IApplication>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const response: IApiResponse<IApplication> = {
      status: 201,
      message: 'success',
      value: {} as IApplication,
    }
    if (this.items.filter(x => x.name === item.name).length > 0) {
      response.status = 422;
      response.message = `There are another application with this name: ${item.name}`;
    } else {
      item.id = this.items.length;
      this.items.push(item);
      response.value = item;
    }
    return of(response);
  }
}

export interface IApplication {
  id: number;
  name: string;
  url: string;
}
