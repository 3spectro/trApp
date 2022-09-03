import { IGenericResponse } from './../domain/core.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';

const URL = `${environment.apiBaseUrl}Applications`;

@Injectable({
  providedIn: 'root'
})
export class ApplicationsService {

  items: IApplication[] = [];

  constructor(
    private readonly http: HttpClient
  ) { }

  get$ = (): Observable<IGenericResponse<IApplication[]>> => {
    return this.http.get<IGenericResponse<IApplication[]>>(URL);
  }

  delete$ = (id: number): Observable<IGenericResponse<boolean>> => {
    return this.http.post<IGenericResponse<boolean>>(URL + '/delete', id);
  }

  update$ = (item: IApplication): Observable<IGenericResponse<number>> => {
    return this.http.put<IGenericResponse<number>>(URL, item);
  }

  save$ = (item: IApplication): Observable<IGenericResponse<number>> => {
    return this.http.post<IGenericResponse<number>>(URL, item);
  }

  /*getEmpty(): IApplication {
    return {
      id: -1,
      name: '',
      url: ''
    };
  }*/

  getEmpty(): Observable<IApplication> {
    return new Observable(observer => {
      observer.next({
        id: -1,
        name: '',
        url: ''
      });
      observer.complete();
    });
  }
}

export interface IApplication {
  id: number;
  name: string;
  url: string;
}
