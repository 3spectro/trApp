import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IApiResponse } from '../domain/core.entity';
import { environment } from './../../../environments/environment';

const URL = `${environment.apiBaseUrl}Auth`;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: IUser;

  user$ = new BehaviorSubject<boolean>(false);

  constructor(
    private readonly http: HttpClient
  ) { }

  login(username: string, password: string): Observable<boolean> {
    return new Observable<boolean>((observer) => {
      this.http.post<IApiResponse<IUser>>(URL + '/login', { username, password }).subscribe(response => {
        debugger;
        if (response.value && response.value.token) {
          this.user = response.value;
          localStorage.setItem('user', JSON.stringify(this.user));
          this.user$.next(true);
          observer.next(true);
        } else {
          this.user = {};
          this.user$.next(false);
          observer.next(false);
        }
        observer.complete();
      });
    });
  }

  validate(): Observable<boolean> {
    this.setAuthToken();
    return this.http.get<boolean>(URL + '/validate');
  }

  private setAuthToken(): void {
    if (!this.user?.token) {
      const lsUser = localStorage.getItem('user');
      if (lsUser) {
        this.user = JSON.parse(lsUser) as IUser;
      }
    }
  }

  logout() {
    this.user = {};
    localStorage.removeItem('user');
    this.user$.next(false);
  }
}

export interface IUser {
  firstName?: string;
  lastName?: string;
  token?: string;
}
