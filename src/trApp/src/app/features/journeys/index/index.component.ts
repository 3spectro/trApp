import { Features } from 'src/app/shared/domain/enums/features.enum';
import { TranslateApiDataService } from './../../../shared/services/translate-api-data.service';
import { IGuest } from './../../../shared/services/guests.service';
import { I201ItemResponse } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { TranslateService } from '@ngx-translate/core';
import { IndexBaseComponent } from './../../../shared/components/index-base/index-base.component';
import { Router } from '@angular/router';
import { JourneysService, IJourney } from './../../../shared/services/journeys.service';
import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { forkJoin, Observable } from 'rxjs';

const NAME = 'Travel';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends IndexBaseComponent<IJourney> implements OnInit {

  constructor(
    toastr: ToastrService,
    messagesService: MessagesService,
    translateService: TranslateService,
    translateApiDataService: TranslateApiDataService,
    private readonly router: Router,
    private readonly service: JourneysService
  ) {
    super(toastr, messagesService, translateService, translateApiDataService);
    this.name = Features.JOURNEY;
    this.getAll$ = this.service.get$();
    this.setGetItemFromId();
    this.getEmpty$ = this.service.getEmpty();
    this.setDelete();
    this.setRemoveFromArray();
    this.setTranslate();
  }

  private setGetItemFromId(): void {
    this.getIndexFromId$ = new Observable<number>(observer => {
      observer.next(this.items?.findIndex(x => x.id == this.selectedItem?.id));
      observer.complete();
    });
  }

  private setDelete(): void {
    this.delete$ = new Observable<IGenericResponse<boolean>>(observer => {
      this.service.delete$(this.selectedItem?.id).subscribe(x => {
        observer.next(x);
        observer.complete();
      });
    });
  }

  private setRemoveFromArray(): void {
    this.removeFromArray$ = new Observable<IJourney[]>(observer => {
      observer.next(this.items?.filter(x => x.id !== this.selectedItem?.id));
      observer.complete();
    });
  }

  private setTranslate(): void {
    this.translate$ = new Observable<void>(observer => {
      this.service.translate(this.items);
      observer.next();
      observer.complete();
    });
  }

  save(res: I201ItemResponse<IJourney>) {
    res.value.id = res.id;
    this.saveItem(res.value);
  }

  goToDetails(id: number) {
    this.service.id = id;
    this.router.navigate(['journeys', 'detail']);
  }
}
