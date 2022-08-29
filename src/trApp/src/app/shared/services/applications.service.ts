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

  get$ = (): Observable<IApiResponse<IApplication[]>> => {
    return this.http.get<IApiResponse<IApplication[]>>(URL);
  }

  delete$ = (id: number): Observable<IApiResponse<boolean>> => {
    return this.http.delete<IApiResponse<boolean>>(URL, { body: { id: id}});
  }

  update$ = (item: IApplication): Observable<IApiResponse<boolean>> => {
    return this.http.put<IApiResponse<boolean>>(URL, item);
  }

  save$ = (item: IApplication): Observable<IGenericResponse<number>> => {
    return this.http.post<IApiResponse<number>>(URL, item).pipe(
      map(resp => {
        debugger;
        return {
          status: resp.status === 201,
          message: resp.status === 201 ? undefined : resp.message,
          value: resp.value
        };
      })
    );
  }
}

export interface IApplication {
  id: number;
  name: string;
  url: string;
}
