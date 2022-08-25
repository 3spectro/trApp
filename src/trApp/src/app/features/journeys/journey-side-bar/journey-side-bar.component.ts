import { IGuest } from './../../../shared/services/guests.service';
import { JourneysService, IJourney } from './../../../shared/services/journeys.service';
import { Subject, AsyncSubject, combineLatest, takeUntil } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-journey-side-bar',
  templateUrl: './journey-side-bar.component.html',
  styleUrls: ['./journey-side-bar.component.css']
})
export class JouernySideBarComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

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
    /*const app: IJourney = this.getGuest();
    this.service.save$(app).subscribe(response => {
      if (response.status === 201) {
        this.save.emit(response.value);
        this.render.selectRootElement(this.close.nativeElement).click();
      }
    });*/
  }

  /*private getGuest(): IJourney {
    return {
      id: -1,
      firstName: this.form.value['firstName'].toString(),
      lastName: this.form.value['lastName'].toString(),
      passport: this.form.value['passport'] ? this.form.value['passport'].toString() : null,
      email: this.form.value['email'] ? this.form.value['email'].toString() : null,
      celPhone: this.form.value['celPhone'] ? this.form.value['celPhone'].toString() : null,
    }
  }*/

  getValidationClass(input: any): string {
    if (!input.touched || !input.value) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }
}
