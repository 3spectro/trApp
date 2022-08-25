import { GuestsService, IGuest } from './../../../shared/services/guests.service';
import { Router } from '@angular/router';
import { JourneysService, IJourney } from './../../../shared/services/journeys.service';
import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { forkJoin } from 'rxjs';

const NAME = 'Travel';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  items?: IJourney[] = [];
  guests?: IGuest[] = [];
  selectedId!: number;

  constructor(
    private readonly router: Router,
    private readonly toastr: ToastrService,
    private readonly journeysService: JourneysService,
    private readonly messagesService: MessagesService,
    private readonly guestsService: GuestsService
  ) { }

  ngOnInit(): void {
    forkJoin({
      travels: this.journeysService.get$(),
      guests: this.guestsService.get$()
    }).subscribe(res => {
      if (res.travels.status === 200) {
        this.items = res.travels.value;
      }
      if (res.guests.status === 200) {
        this.guests = res.guests.value;
      }
    });
  }

  selectItem(id: number): void {
    this.selectedId = id;
  }

  save(item: IJourney): void {
    this.toastr.success(this.messagesService.getCreateMessage(NAME));
    this.items?.push(item);
  }

  delete(): void {
    this.journeysService.delete$(this.selectedId).subscribe(res => {
      if (res.status === 200) {
        this.items = this.items?.filter(x => x.id !== this.selectedId);
        this.toastr.success(this.messagesService.getDeleteMessage(NAME));
      }
    })
  }

  goToDetails(id: number) {
    this.router.navigate(['journeys', 'detail']);
  }
}
