import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Observable } from 'rxjs';
import { IndexBaseComponent } from './../../../shared/classes/index-base.component';
import { MessagesService } from './../../../shared/services/messages.service';
import { GuestsService, IGuest } from './../../../shared/services/guests.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

const NAME = 'Guest';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent  extends IndexBaseComponent<IGuest> implements OnInit {
  constructor(
    toastr: ToastrService,
    private readonly service: GuestsService,
    messagesService: MessagesService
  ) {
    super(toastr, messagesService);
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

  ngOnInit(): void {
    this.init();
  }
}
