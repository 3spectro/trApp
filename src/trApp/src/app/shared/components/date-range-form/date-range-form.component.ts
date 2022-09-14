import { ValidationsService } from './../../services/validations.service';
import { FormGroup, FormControl, Validators, ValidatorFn } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-date-range-form',
  templateUrl: './date-range-form.component.html',
  styleUrls: ['./date-range-form.component.css']
})
export class DateRangeFormComponent implements OnInit {
  @Input() config: IDateRangeFormSettings = {
    allowsDisabledDateFrom: false,
    allowsDisabledDateTo: false
  };
  @Output() isInvalid: EventEmitter<boolean> = new EventEmitter<boolean>();

  isStartDateDefined!: boolean;
  isEndDateDefined!: boolean;

  datesForm!: FormGroup;

  constructor(
    private readonly validationsService: ValidationsService
  ) { }

  private initForm(): void {
    this.datesForm = new FormGroup({
        dateFrom: new FormControl('', Validators.required),
        dateTo: new FormControl('', Validators.required),
      },[this.dateRangeValidator]);
  }

  ngOnInit(): void {
    this.initForm();
  }

  private dateRangeValidator: ValidatorFn = (): { [key: string]: any; } | null => {
    let invalid = false;
    const from = this.datesForm && this.datesForm.get("dateFrom")?.value;
    const to = this.datesForm && this.datesForm.get("dateTo")?.value;
    if (from && to) {
      invalid = new Date(from).valueOf() > new Date(to).valueOf();
      this.isInvalid.emit(invalid);
    } else {
      this.isInvalid.emit(true);
    }
    // TODO: CUSTOMIZAR EL MENSAJE DE ERROR, QUE ADMITRA TRANSLATION
    return invalid ? { invalidRange: { message: 'Mensaje de aca pq puedo' } } : null;
  };

  getDateValidationClass(input: any, form: FormGroup): string {
    return this.validationsService.getDateValidationClass(input, form);
  }

  getDateRange(): IDateRange {
    return {
      from: this.datesForm && this.datesForm.get("dateFrom")?.value,
      to: this.datesForm && this.datesForm.get("dateTo")?.value,
    }
  }
}

export interface IDateRangeFormSettings {
  allowsDisabledDateFrom: boolean;
  textDisabledDateFrom?: string;
  allowsDisabledDateTo: boolean;
  textDisabledDateTo?: string;
}

export interface IDateRange {
  from: Date;
  to: Date;
}
