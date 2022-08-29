import { LoadingBarService } from './loading-bar.service';
import { Injectable } from '@angular/core';
import { of, Observable, timer, map } from 'rxjs';
import { IApiResponse } from '../domain/core.entity';

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  items: IGuest[] = [
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
    },
    {
      id: 3,
      firstName: 'Leonardo',
      lastName: 'Frias',
      passport: 'ABC423182',
      email: 'leofrias@gmail.com',
      celPhone: '+5493513325419'
    },
  ];

  constructor(
    private readonly loadingBarService: LoadingBarService
  ) { }

  get$ = (): Observable<IApiResponse<IGuest[]>> => {
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

  update$ = (item: IGuest): Observable<IApiResponse<IGuest>> => {
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

  save$ = (item: IGuest): Observable<IApiResponse<IGuest>> => {
    this.loadingBarService.show();
    timer(1000).subscribe(() => this.loadingBarService.hidde());
    const response: IApiResponse<IGuest> = {
      status: 201,
      message: undefined,
      value: {} as IGuest,
    }
    if (this.items.filter(x => x.passport === item.passport).length > 0) {
      response.status = 422;
      // response.message = `There are another application with this passport: ${item.passport}`;
    } else {
      item.id = this.items.length;
      response.value = item;
    }
    return of(response);
  }
}

export interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
  passport?: string;
  email?: string;
  celPhone?: string;
}
