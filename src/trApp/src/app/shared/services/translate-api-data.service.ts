import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateApiDataService {

  applyTranslation$ = new Subject<void>();

  constructor() { }

  translate() {
    this.applyTranslation$.next();
  }
}
