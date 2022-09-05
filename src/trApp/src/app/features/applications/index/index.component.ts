import { I201ItemResponse } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Observable } from 'rxjs';
import { IndexBaseComponent } from '../../../shared/components/index-base/index-base.component';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from 'src/app/shared/services/applications.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent extends IndexBaseComponent<IApplication> {

  constructor(
    toastr: ToastrService,
    private readonly service: ApplicationsService,
    messagesService: MessagesService
  ) {
    super(toastr, messagesService);
    this.name = 'Application';
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
    this.removeFromArray$ = new Observable<IApplication[]>(observer => {
      observer.next(this.items?.filter(x => x.id !== this.selectedItem?.id));
      observer.complete();
    });
  }

  save(res: I201ItemResponse<IApplication>) {
    res.value.id = res.id;
    this.saveItem(res.value);
  }
}
