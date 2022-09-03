import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Subject, AsyncSubject, combineLatest, takeUntil, Observable } from 'rxjs';
import { IGuest, GuestsService } from '../../../shared/services/guests.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'

const NAME = 'Guest';

@Component({
  selector: 'app-guest-side-bar',
  templateUrl: './guest-side-bar.component.html',
  styleUrls: ['./guest-side-bar.component.css']
})
export class GuestSideBarComponent implements OnInit {
  @Input() item!: IGuest;
  @Output() save: EventEmitter<IGuest> = new EventEmitter<IGuest>();

  @ViewChild('close') closeButton!: ElementRef;

  form!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  isUpdate = false;

  constructor(
    private fb: FormBuilder,
    private readonly renderer: Renderer2,
    private readonly toastr: ToastrService,
    private readonly service: GuestsService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.initForm();
    combineLatest([this.afterViewInit$, this.onChanges$]).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.form.patchValue(this.item);
      this.isUpdate = this.item.id > 0;
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

  getValidationClass(input: any): string {
    if (!input.touched || !input.value) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }

  onSubmit() {
    let item = this.getGuest();
    this.getAction(item).subscribe(res => {
      this.processResult(item, res);
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

  private getAction(item: IGuest): Observable<IGenericResponse<number>> {
    return !this.isUpdate ? this.service.save$(item) : this.service.update$(item)
  }

  private processResult(item: IGuest, res: IGenericResponse<number>) {
    if (res.status) {
      this.processOkResult(item, res.value);
    } else {
      this.form.controls[res.message?.field as string].setErrors({ incorrect: true, message: res.message?.message});
      this.toastr.warning(res.message?.message);
    }
  }

  private processOkResult(item: IGuest, id:number): void {
    item.id = id;
    if (this.isUpdate) {
      this.toastr.success(this.messagesService.getUpdateMessage(NAME));
    } else {
      this.toastr.success(this.messagesService.getCreateMessage(NAME));
    }
    this.save.emit(item);
    this.renderer.selectRootElement(this.closeButton.nativeElement).click();
  }
}
