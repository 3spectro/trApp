import { EventsService } from 'src/app/shared/services/events.service';
import { Features } from 'src/app/shared/domain/enums/features.enum';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarBaseComponent } from 'src/app/shared/components/side-bar-base/side-bar-base.component';
import { IEvent } from 'src/app/shared/services/events.service';
import { Component, Input, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-event-side-bar',
  templateUrl: './event-side-bar.component.html',
  styleUrls: ['./event-side-bar.component.css']
})
export class EventSideBarComponent extends SideBarBaseComponent<IEvent> {
  @Input() event!: IEvent;
  newEvent!: IEvent;
  showGenericStep: boolean = true;

  constructor(
    renderer: Renderer2,
    toastr: ToastrService,
    messagesService: MessagesService,
    private readonly service : EventsService
  ) {
    super(renderer, toastr, messagesService)
  }

  next() {
    this.showGenericStep = false;
  }

  back() {
    this.showGenericStep = true;
  }

  onSubmit() {

  }
}
