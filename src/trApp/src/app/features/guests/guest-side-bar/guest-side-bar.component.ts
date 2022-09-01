import { Subject, AsyncSubject, combineLatest, takeUntil } from 'rxjs';
import { IGuest, GuestsService } from '../../../shared/services/guests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'

@Component({
  selector: 'app-guest-side-bar',
  templateUrl: './guest-side-bar.component.html',
  styleUrls: ['./guest-side-bar.component.css']
})
export class GuestSideBarComponent implements OnInit {
  @ViewChild('close') close!: ElementRef;

  @Input() item!: IGuest;
  @Output() save: EventEmitter<IGuest> = new EventEmitter<IGuest>();

  form!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  constructor(
    private fb: FormBuilder,
    private service: GuestsService,
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
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      passport: ['', [Validators.required, Validators.min(9), Validators.max(9)]],
      email: ['', [Validators.pattern(RegEx.EMAIL)]],
      celPhone: ['', []],
    });
  }

  private setForm(): void {
    this.form.setValue(
      {
        firstName: this.item.firstName ?? '',
        lastNamel: this.item.lastName ?? '',
        passport: this.item.passport ?? '',
        email: this.item.email ?? '',
        celPhone: this.item.celPhone ?? '',
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
    const app: IGuest = this.getGuest();
    this.service.save$(app).subscribe(response => {
      if (response.status === 201) {
        this.save.emit(response.value);
        this.render.selectRootElement(this.close.nativeElement).click();
      }
    });
  }

  private getGuest(): IGuest {
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
  }
}
