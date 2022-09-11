import { IGuest } from './../../../../shared/services/guests.service';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-travelers',
  templateUrl: './travelers.component.html',
  styleUrls: ['./travelers.component.css']
})
export class TravelersComponent implements OnInit {
  @Input() items: IGuest[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
