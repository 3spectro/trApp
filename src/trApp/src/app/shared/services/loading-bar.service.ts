import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoadingBarService {

  private count = 0;
  showLoadingBar$ = new Subject<boolean>();

  show() {
    this.count ++;
    this.showLoadingBar$.next(true);
  }

  hidde() {
    this.count--;
    if (this.count <= 0) {
      this.showLoadingBar$.next(false);
      this.count = 0;
    }
  }
}
