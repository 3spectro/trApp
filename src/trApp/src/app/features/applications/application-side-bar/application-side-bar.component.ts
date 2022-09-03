import { IGenericResponse } from './../../../shared/domain/core.entity';
import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from './../../../shared/services/applications.service';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter, ViewChild, ElementRef, Renderer2 } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, combineLatest, Subject, takeUntil, Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'

const NAME = 'Application';

@Component({
  selector: 'app-application-side-bar',
  templateUrl: './application-side-bar.component.html',
  styleUrls: ['./application-side-bar.component.css']
})
export class ApplicationSideBarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() item!: IApplication;
  @Output() save: EventEmitter<IApplication> = new EventEmitter<IApplication>();

  @ViewChild('close') closeButton!: ElementRef;

  form!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  isUpdate = false;

  constructor(
    private readonly renderer: Renderer2,
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly applicationsService: ApplicationsService,
    private readonly messagesService: MessagesService
  ) { }

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

  ngOnInit(): void {
    this.initForm();
    combineLatest([this.afterViewInit$, this.onChanges$]).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      this.form.patchValue(this.item);
      this.isUpdate = this.item.id > 0;
    });
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.pattern(RegEx.URL)]],
    });
  }

  getValidationClass(input: any): string {
    if (!input.touched) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }

  onSubmit() {
    let app = this.getApplication();
    this.getAction(app).subscribe(res => {
      this.processResult(app, res);
    });
  }

  private getApplication(): IApplication {
    return {
      id: this.item.id,
      name: this.form.value['name'].toString(),
      url: this.form.value['url'].toString()
    }
  }

  private getAction(app: IApplication): Observable<IGenericResponse<number>> {
    return !this.isUpdate ? this.applicationsService.save$(app) : this.applicationsService.update$(app)
  }

  private processResult(app: IApplication, res: IGenericResponse<number>) {
    if (res.status) {
      this.processOkResult(app, res.value);
    } else {
      this.form.controls[res.message?.field as string].setErrors({ incorrect: true, message: res.message?.message});
      this.toastr.warning(res.message?.message);
    }
  }

  private processOkResult(app: IApplication, id:number): void {
    app.id = id;
    if (this.isUpdate) {
      this.toastr.success(this.messagesService.getUpdateMessage(NAME));
    } else {
      this.toastr.success(this.messagesService.getCreateMessage(NAME));
    }
    this.save.emit(app);
    this.closeSlider();
  }

  closeSlider() {
    this.form.reset();
    this.renderer.selectRootElement(this.closeButton.nativeElement).click();
  }
}
