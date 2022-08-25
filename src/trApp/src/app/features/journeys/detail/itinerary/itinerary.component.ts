import { IEvent, EventsService } from 'src/app/shared/services/events.service';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subject, take, takeUntil } from 'rxjs';

const NAME = 'Event';

@Component({
  selector: 'app-itinerary',
  templateUrl: './itinerary.component.html',
  styleUrls: ['./itinerary.component.css']
})
export class ItineraryComponent implements OnInit, OnDestroy {
  items?: IEvent[] = [];
  selectedId!: number;
  totalPrice = 0;

  stopHighLight$ = new Subject<void>();
  application!: string;
  code!: string;

  constructor(
    private readonly toastr: ToastrService,
    private readonly messagesService: MessagesService,
    private readonly eventsService: EventsService
  ) { }

  ngOnInit(): void {
    this.eventsService.get$().subscribe(res => {
      if (res.status === 200) {
        this.items = res.value;
        this.items.forEach(x => {
          this.totalPrice += x.price;
        });
      }
    });
  }

  ngOnDestroy(): void {
    this.stopHighLight$.complete();
  }

  selectItem(id: number): void {
    this.selectedId = id;
  }

  save(item: IEvent): void {
    this.toastr.success(this.messagesService.getCreateMessage(NAME));
    this.items?.push(item);
  }

  delete(): void {
    this.eventsService.delete$(this.selectedId).subscribe(res => {
      if (res.status === 200) {
        this.items = this.items?.filter(x => x.id !== this.selectedId);
        this.toastr.success(this.messagesService.getDeleteMessage(NAME));
      }
    })
  }

  showReservationCode(event: IEvent) {
    this.application = event.app.name;
    this.code = event.reservationCode;
    event.highLight = true;
    interval(500).pipe(takeUntil(this.stopHighLight$))
    .subscribe(
      {
        next: () =>  { event.highLight = !event.highLight },
        complete: () => { event.highLight = false }
      });
  }

  closeReservationCodeModal() {
    this.stopHighLight$.next();
  }

}
