import { IGenericResponse } from './../domain/core.entity';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const URL = `${environment.apiBaseUrl}Guests`;

@Injectable({
  providedIn: 'root'
})
export class GuestsService {

  constructor(
    private readonly http: HttpClient
  ) { }

  get$ = (): Observable<IGenericResponse<IGuest[]>> => {
    return this.http.get<IGenericResponse<IGuest[]>>(URL);
  }

  getByJourney$ = (id: number): Observable<IGenericResponse<IGuest[]>> => {
    var params = new HttpParams()
    .set('id', id)
    return this.http.get<IGenericResponse<IGuest[]>>(URL + '/journey', {params: params});
  }

  delete$ = (id: number): Observable<IGenericResponse<boolean>> => {
    return this.http.post<IGenericResponse<boolean>>(URL + '/delete', id);
  }

  update$ = (item: IGuest): Observable<IGenericResponse<number>> => {
    return this.http.put<IGenericResponse<number>>(URL, item);
  }

  save$ = (item: IGuest): Observable<IGenericResponse<number>> => {
    return this.http.post<IGenericResponse<number>>(URL, item);
  }

  getEmpty(): Observable<IGuest> {
    return new Observable(observer => {
      observer.next({
        id: -1,
        firstName: '',
        lastName: '',
        passport: '',
        email: '',
        celPhone: '',
      });
      observer.complete();
    });
  }
}

export interface IGuest {
  id: number;
  firstName: string;
  lastName: string;
  passport?: string;
  email?: string;
  celPhone?: string;

  // UI properties
  isSelected?: boolean;
}
