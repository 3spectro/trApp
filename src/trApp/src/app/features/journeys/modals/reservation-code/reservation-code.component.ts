import { ToastrService } from 'ngx-toastr';
import { Clipboard } from '@angular/cdk/clipboard';
import { Component, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-reservation-code',
  templateUrl: './reservation-code.component.html',
  styleUrls: ['./reservation-code.component.css']
})
export class ReservationCodeComponent {
  @Input() application!: string;
  @Input() code!: string;
  @Output() close: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private readonly clipboard: Clipboard,
    private readonly toastrService: ToastrService
  ) { }

  copyToClipboard(): void {
    this.clipboard.copy(this.code);
    this.toastrService.success('Reservation code copied!');
  }

}
