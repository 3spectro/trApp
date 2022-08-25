import { Injectable } from '@angular/core';
import { BehaviorSubject, of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user!: IUser;

  user$ = new BehaviorSubject<IUser>({
    isLogged: false
  });

  constructor() { }

  validate() {
    this.user$.next({
      isLogged: true
    });
  }

  login(username: string, password: string): Observable<boolean> {
    if (username === 'esteban' && password === 'abc') {
      this.user$.next({
        isLogged: true
      });
      return of(true);
    } else {
      this.user$.next({
        isLogged: false
      });
      return of(false);
    }
  }

  logout() {
    this.user$.next({
      isLogged: false
    });
  }
}

export interface IUser {
  name?: string;
  userName?: string;
  token?: string;
  isLogged: boolean;
}
