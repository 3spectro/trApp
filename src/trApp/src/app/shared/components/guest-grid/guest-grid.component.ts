import { IGuest } from './../../services/guests.service';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-guest-grid',
  templateUrl: './guest-grid.component.html',
  styleUrls: ['./guest-grid.component.css']
})
export class GuestGridComponent implements OnInit {
  @Input() items: IGuest[] = [];
  @Input() enable: boolean = true;

  @Output() selectItemEvent: EventEmitter<IGuest> = new EventEmitter<IGuest>();

  constructor() { }

  ngOnInit(): void {
  }

  selectItem(item: IGuest): void {
    this.selectItemEvent.emit(item);
  }

}
