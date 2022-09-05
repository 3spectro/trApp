import { MessagesService } from './../../services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IGenericResponse } from './../../domain/core.entity';
import { Subject, AsyncSubject, combineLatest, takeUntil, Observable } from 'rxjs';
import { FormGroup } from '@angular/forms';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnChanges, OnDestroy, ViewChild, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-side-bar-base',
  template: '',
  styles: ['']
})
export class SideBarBaseComponent<T> implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() item!: T;
  @Output() save: EventEmitter<I201ItemResponse<T>> = new EventEmitter<I201ItemResponse<T>>();

  @ViewChild('close') closeButton!: ElementRef;

  form!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  isUpdate = false;

  initForm$!: Observable<void>;
  setIsUpdate$!: Observable<void>;

  save$!: Observable<any>;
  update$!: Observable<any>;
  getItem$!: Observable<T>;
  setIdToItem$!: Observable<void>;

  name!: string;

  constructor(
    readonly renderer: Renderer2,
    readonly toastr: ToastrService,
    private readonly messagesService: MessagesService,
  ) { }

  ngOnInit(): void {
    debugger;
    this.initForm$.subscribe();
    combineLatest([this.afterViewInit$, this.onChanges$]).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      debugger;
      this.form.patchValue(this.item);
      this.setIsUpdate$.subscribe();
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
    if (!input.touched) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }

  processResult(app: T, res: IGenericResponse<number>) {
    if (res.status) {
      this.processOkResult(app, res.value);
    } else {
      this.form.controls[res.message?.field as string].setErrors({ incorrect: true, message: res.message?.message});
      this.toastr.warning(res.message?.message);
    }
  }

  private processOkResult(item: T, id:number): void {
    this.setIdToItem$.subscribe(() => {
      debugger;
      if (this.isUpdate) {
        this.toastr.success(this.messagesService.getUpdateMessage(this.name));
      } else {
        this.toastr.success(this.messagesService.getCreateMessage(this.name));
      }
      this.save.emit({ id: id, value: item});
      this.closeSlider();
    })
  }

  closeSlider() {
    this.form.reset();
    this.renderer.selectRootElement(this.closeButton.nativeElement).click();
  }
}

export interface I201ItemResponse<T> {
  id: number;
  value: T;
}
