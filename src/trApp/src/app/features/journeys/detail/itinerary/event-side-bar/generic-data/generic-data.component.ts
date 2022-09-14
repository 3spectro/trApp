import { EventsService } from './../../../../../../shared/services/events.service';
import { ValidationsService } from 'src/app/shared/services/validations.service';
import { DateRangeFormComponent } from 'src/app/shared/components/date-range-form/date-range-form.component';
import { IApplication, ApplicationsService } from 'src/app/shared/services/applications.service';
import { IEvent } from 'src/app/shared/services/events.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, ViewChild, Input } from '@angular/core';

@Component({
  selector: 'app-generic-data',
  templateUrl: './generic-data.component.html',
  styleUrls: ['./generic-data.component.css']
})
export class GenericDataComponent implements OnInit {
  @Input() item!: IEvent;
  @Output() next: EventEmitter<void> = new EventEmitter<void>();
  @Output() close: EventEmitter<void> = new EventEmitter<void>();
  @ViewChild('dateRange') dateRange!: DateRangeFormComponent;

  isValidDateForm = false;
  form!: FormGroup;

  applications: IApplication[] = [];
  applicationSelected!: IApplication;
  noApplicationSelected: IApplication = {
    id: -1,
    name: '',
    url: ''
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly applicationService: ApplicationsService,
    private readonly validationsService: ValidationsService,
    private readonly eventsService: EventsService
  ) {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({
      price: ['', [Validators.required]],
      application: ['', [Validators.required]],
      reservationCode: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadApplications();
  }

  private loadApplications(): void {
    this.applicationService.get$().subscribe(x => {
      this.applications = x.value
      this.form.get('application')?.setValue(-1);
    });
  }

  onSubmit(): void {
    const event = this.getEvent();
    this.eventsService.event = event;
    this.next.emit();
  }

  private getEvent(): IEvent {
    const dates = this.dateRange.getDateRange();
    return {
      id: this.item.id,
      app: this.form.value['application'].toString(),
      dateFrom: new Date(dates.from),
      dateTo: new Date(dates.to),
      price: this.form.value['price'].toString(),
      reservationCode: this.form.value['reservationCode'].toString(),
      getDescription: (): string => {return ''}
    }
  }

  getValidationClass(input: any): string {
    return this.validationsService.getValidationClass(input);
  }

  closeSlider(): void {
    this.close.emit();
  }
}
