import { IGenericResponse } from './../domain/core.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { IApiResponse } from '../domain/core.entity';

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
    return this.http.post<IApiResponse<boolean>>(URL + '/delete', id).pipe(
      map(resp => {
        return this.getGenericResponse(200, resp);
      })
    );
  }

  update$ = (item: IApplication): Observable<IGenericResponse<number>> => {
    return this.http.put<IApiResponse<number>>(URL, item).pipe(
      map(resp => {
        return this.getGenericResponse(201, resp);
        /*return {
          status: resp.status === 201,
          message: resp.status === 201 ? undefined : resp.message,
          value: resp.value
        };*/
      })
    );
  }

  save$ = (item: IApplication): Observable<IGenericResponse<number>> => {
    return this.http.post<IApiResponse<number>>(URL, item).pipe(
      map(resp => {
        return this.getGenericResponse(201, resp);
        /*return {
          status: resp.status === 201,
          message: resp.status === 201 ? undefined : resp.message,
          value: resp.value
        };*/
      })
    );
  }

  getEmptyApplication(): IApplication {
    return {
      id: -1,
      name: '',
      url: ''
    };
  }

  private getGenericResponse(okStatus: number, resp: IApiResponse<any>): IGenericResponse<any>{
    return {
      status: resp.status === 201,
      message: resp.status === 201 ? undefined : resp.message,
      value: resp.value
    };
  }
}

export interface IApplication {
  id: number;
  name: string;
  url: string;
}
