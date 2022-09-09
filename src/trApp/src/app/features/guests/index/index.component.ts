import { TranslateApiDataService } from './../../../shared/services/translate-api-data.service';
import { TranslateService } from '@ngx-translate/core';
import { I201ItemResponse } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Observable } from 'rxjs';
import { IndexBaseComponent } from '../../../shared/components/index-base/index-base.component';
import { MessagesService } from './../../../shared/services/messages.service';
import { GuestsService, IGuest } from './../../../shared/services/guests.service';
import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const NAME = 'Guest';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  extends IndexBaseComponent<IGuest> {
  constructor(
    toastr: ToastrService,
    messagesService: MessagesService,
    translateService: TranslateService,
    translateApiDataService: TranslateApiDataService,
    private readonly service: GuestsService
  ) {
    super(toastr, messagesService, translateService, translateApiDataService);
    this.name = NAME;
    this.getAll$ = this.service.get$();
    this.getIndexFromId$ = new Observable<number>(observer => {
      observer.next(this.items?.findIndex(x => x.id == this.selectedItem?.id));
      observer.complete();
    });
    this.getEmpty$ = this.service.getEmpty();
    this.delete$ = new Observable<IGenericResponse<boolean>>(observer => {
      this.service.delete$(this.selectedItem?.id).subscribe(x => {
        observer.next(x);
        observer.complete();
      });
    });
    this.removeFromArray$ = new Observable<IGuest[]>(observer => {
      observer.next(this.items?.filter(x => x.id !== this.selectedItem?.id));
      observer.complete();
    });
  }

  save(res: I201ItemResponse<IGuest>) {
    res.value.id = res.id;
    this.saveItem(res.value);
  }
}
