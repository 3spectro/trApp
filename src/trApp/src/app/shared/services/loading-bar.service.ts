import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  showLoadingBar$ = new Subject<boolean>();

  show() {
    this.showLoadingBar$.next(true);
  }

  hidde() {
    this.showLoadingBar$.next(false);
  }
}
