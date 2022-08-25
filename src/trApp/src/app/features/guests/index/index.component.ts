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
export class IndexComponent implements OnInit {
  items?: IGuest[] = [];
  selectedId!: number;

  constructor(
    private readonly toastr: ToastrService,
    private readonly guestsService: GuestsService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.guestsService.get$().subscribe(x => {
      if (x.status === 200) {
        this.items = x.value;
      }
    });
  }

  selectItem(id: number): void {
    this.selectedId = id;
  }

  save(item: IGuest): void {
    this.toastr.success(this.messagesService.getCreateMessage(NAME));
    this.items?.push(item);
  }

  delete(): void {
    this.guestsService.delete$(this.selectedId).subscribe(res => {
      if (res.status === 200) {
        this.items = this.items?.filter(x => x.id !== this.selectedId);
        this.toastr.success(this.messagesService.getDeleteMessage(NAME));
      }
    })
  }
}
