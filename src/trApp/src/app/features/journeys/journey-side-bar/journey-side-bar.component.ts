import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Features } from './../../../shared/domain/enums/features.enum';
import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { SideBarBaseComponent } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGuest, GuestsService } from './../../../shared/services/guests.service';
import { JourneysService, IJourney } from './../../../shared/services/journeys.service';
import { Subject, AsyncSubject, combineLatest, takeUntil, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-journey-side-bar',
  templateUrl: './journey-side-bar.component.html',
  styleUrls: ['./journey-side-bar.component.css']
})
export class JouernySideBarComponent extends SideBarBaseComponent<IJourney> {
  /*@ViewChild('close') close!: ElementRef;

  @Input() item!: IJourney;
  @Input() guests?: IGuest[];
  @Output() save: EventEmitter<IJourney> = new EventEmitter<IJourney>();

  form!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  constructor(
    private readonly fb: FormBuilder,
    private readonly render: Renderer2
  ) { }

  ngOnInit(): void {
    this.initForm();
    combineLatest([this.afterViewInit$, this.onChanges$]).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.setForm();
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      isFinished: [false, null],
      startDate: ['', null],
      endDate: ['', null],
    });
  }

  private setForm(): void {
    this.form.setValue(
      {
        name: this.item.name ?? '',
        startDate: this.item.startDate ?? '',
        endDate: this.item.endDate ?? '',
      });
  }

  ngAfterViewInit(): void {
    this.afterViewInit$.next();
  }

  ngOnChanges(): void {
    this.onChanges$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  onSubmit() {
    const app: IJourney = this.getGuest();
    this.service.save$(app).subscribe(response => {
      if (response.status === 201) {
        this.save.emit(response.value);
        this.render.selectRootElement(this.close.nativeElement).click();
      }
    });
  }

  private getGuest(): IJourney {
    return {
      id: -1,
      firstName: this.form.value['firstName'].toString(),
      lastName: this.form.value['lastName'].toString(),
      passport: this.form.value['passport'] ? this.form.value['passport'].toString() : null,
      email: this.form.value['email'] ? this.form.value['email'].toString() : null,
      celPhone: this.form.value['celPhone'] ? this.form.value['celPhone'].toString() : null,
    }
  }

  getValidationClass(input: any): string {
    if (!input.touched || !input.value) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }*/
  guests?: IGuest[];
  selectedGuest: number[] = [];
  guestGridTouched: boolean = false;

  isStartDateDefined: boolean = true;
  isEndDateDefined: boolean = true;
  iamTravelingAlone: boolean = true;

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
