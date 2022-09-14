import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Features } from './../../../shared/domain/enums/features.enum';
import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarBaseComponent } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGuest, GuestsService } from './../../../shared/services/guests.service';
import { JourneysService, IJourney } from './../../../shared/services/journeys.service';
import { Observable } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, Renderer2 } from '@angular/core';
import { IDateRangeFormSettings } from 'src/app/shared/components/date-range-form/date-range-form.component'

@Component({
  selector: 'app-journey-side-bar',
  templateUrl: './journey-side-bar.component.html',
  styleUrls: ['./journey-side-bar.component.css']
})
export class JouernySideBarComponent extends SideBarBaseComponent<IJourney> {
  guests?: IGuest[];
  selectedGuest: number[] = [];
  guestGridTouched: boolean = false;

  isStartDateDefined: boolean = true;
  isEndDateDefined: boolean = true;
  iamTravelingAlone: boolean = true;

  dateRangeConfig: IDateRangeFormSettings = {
    allowsDisabledDateFrom: true,
    textDisabledDateFrom: 'Test',
    allowsDisabledDateTo: true,
    textDisabledDateTo: 'string;'
  }

  constructor(
    renderer: Renderer2,
    toastr: ToastrService,
    messagesService: MessagesService,
    private readonly fb: FormBuilder,
    private readonly service: JourneysService,
    private readonly guestService: GuestsService,
  ) {
    super(renderer, toastr, messagesService);
    this.name = Features.JOURNEY;
    this.initForm();
    this.setIsUpdate();
    this.setGuests();
  }

  private initForm(): void {
    this.initForm$ = new Observable<void>(observer => {
      this.form = this.fb.group({
        name: ['', [Validators.required]],
        startDate: ['', null],
        endDate: ['', null],
      });
      observer.next();
      observer.complete();
    });
  }

  private setIsUpdate(): void {
    this.setIsUpdate$ = new Observable<void>(observer => {
      this.isUpdate = this.item.id > 0;
      observer.next();
      observer.complete();
    });
  }

  private setGuests(): void {
    this.guestService.get$().subscribe(x => {
      if (x.status) {
        this.guests = x.value;
        this.guests.map(x => x.isSelected = false);
      }
    });
  }

  hasInvalidTravelers(): boolean {
    if (!this.iamTravelingAlone) {
      const travelers = this.guests?.filter(x => x.isSelected);
      return travelers !== undefined ? travelers.length === 0 : false;
    }
    return false;
  }

  onSubmit() {
    let app = this.getItem();
    this.getAction(app).subscribe(res => {
      this.processResult(app, res);
    });
  }

  private getItem(): IJourney {
    return {
      id: this.item.id,
      name: this.form.value['name'].toString(),
      startDate: this.isStartDateDefined ? this.form.value['startDate'].toString() : null,
      endDate: this.isStartDateDefined ?  this.form.value['endDate'].toString() : null,
      guests: this.iamTravelingAlone ? [] : this.getGuestIds()
    }
  }

  private getGuestIds(): number[] {
    const selectedItems = this.guests?.filter(x => x.isSelected);
    if (selectedItems !== undefined) {
      return selectedItems.map(x => x.id);
    }
    return [];
  }

  private getAction(app: IJourney): Observable<IGenericResponse<number>> {
    return !this.isUpdate ? this.service.save$(app) : this.service.update$(app)
  }
}
