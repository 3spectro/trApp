import { TranslateService } from '@ngx-translate/core';
import { IGenericResponse } from './../domain/core.entity';
import { HttpClient } from '@angular/common/http';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable, map, forkJoin, ReplaySubject, Subject } from 'rxjs';
import { JourneysStatus } from '../domain/enums/journeys-status.enum';

const URL = `${environment.apiBaseUrl}Journeys`;

@Injectable({
  providedIn: 'root'
})
export class JourneysService {

  id!: number;

  constructor(
    private readonly http: HttpClient,
    private readonly translateService: TranslateService
  ) { }

  get$ = (): Observable<IGenericResponse<IJourney[]>> => {
    return forkJoin([
      this.translateService.get(JourneysStatus.PENDING),
      this.translateService.get(JourneysStatus.IN_COURSE),
      this.translateService.get(JourneysStatus.COMPLETE),
      this.http.get<IGenericResponse<IJourney[]>>(URL)]).pipe(
        map(([pending, incourse,complete, journeys]) => {
          const today = new Date();
          journeys.value.forEach(item => {
            if (!item.startDate || item.startDate < today ) {
              item.status = JourneysStatus.PENDING;
              item.statusValue = pending;
            } else {
              if (item.startDate > today && (!item.endDate || item.endDate > today)) {
                item.status = JourneysStatus.IN_COURSE;
                item.statusValue = incourse;
              }
              else {
                item.status = JourneysStatus.COMPLETE;
                item.statusValue = complete;
              }
            }
          })
          return journeys;
        })
      )
  }

  delete$ = (id: number): Observable<IGenericResponse<boolean>> => {
    return this.http.post<IGenericResponse<boolean>>(URL + '/delete', id);
  }

  update$ = (item: IJourney): Observable<IGenericResponse<number>> => {
    return this.http.put<IGenericResponse<number>>(URL, item);
  }

  save$ = (item: IJourney): Observable<IGenericResponse<number>> => {
    return this.http.post<IGenericResponse<number>>(URL, item);
  }

  getEmpty(): Observable<IJourney> {
    return new Observable(observer => {
      observer.next({
        id: -1,
        name: '',
        startDate: undefined,
        endDate: undefined,
        guests: []
      });
      observer.complete();
    });
  }

  translate(items: IJourney[]): void {
    forkJoin([
      this.translateService.get(JourneysStatus.PENDING),
      this.translateService.get(JourneysStatus.IN_COURSE),
      this.translateService.get(JourneysStatus.COMPLETE)
    ]).subscribe(([pending, incourse,complete]) => {
      items.forEach(item => {
        switch (item.status) {
          case JourneysStatus.PENDING:
            item.statusValue = pending;
            break;
          case JourneysStatus.IN_COURSE:
            item.statusValue = incourse;
            break;
          case JourneysStatus.COMPLETE:
            item.statusValue = complete;
            break;
        };
      });
    })
  }
}

export interface IJourney {
  id: number;
  name: string;
  startDate?: Date;
  endDate?: Date;
  guests?: number[];
  status?: string;
  statusValue?: string;
}

interface IJourneyStatus {
  key: string;
  value: string;
}
