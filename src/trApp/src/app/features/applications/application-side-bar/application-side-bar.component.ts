import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from './../../../shared/services/applications.service';
import { AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AsyncSubject, combineLatest, Subject, takeUntil } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'

@Component({
  selector: 'app-application-side-bar',
  templateUrl: './application-side-bar.component.html',
  styleUrls: ['./application-side-bar.component.css']
})
export class ApplicationSideBarComponent implements OnInit, AfterViewInit, OnChanges, OnDestroy {
  @Input() app!: IApplication;
  @Output() save: EventEmitter<IApplication> = new EventEmitter<IApplication>();

  applicationForm!: FormGroup;

  afterViewInit$ = new Subject<void>();
  onChanges$ = new Subject<void>();
  onDestroy$ = new AsyncSubject<void>();

  constructor(
    private fb: FormBuilder,
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
      this.applicationForm.setValue(
        {
          name: this.app.name ?? '',
          url: this.app.url ?? ''
        });
    });
  }

  private initForm(): void {
    this.applicationForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      url: ['', [Validators.required, Validators.pattern(RegEx.URL)]],
    });
  }

  getValidationClass(input: any): string {
    if (!input.touched) return '';
    return input.invalid ? 'invalid-input' : 'valid-input';
  }

  onSubmit() {
    let app: IApplication = {
      id: -1,
      name: this.applicationForm.value['name'].toString(),
      url: this.applicationForm.value['url'].toString()
    }
    this.applicationsService.save$(app).subscribe(res => {
      debugger;
      if (res.status) {
        app.id = res.value;
        this.toastr.success(this.messagesService.getDeleteMessage('Application'));
        this.save.emit(app);
      } else {
        // this.toastr.warning(res.message);
        this.applicationForm.controls['name'].setErrors({ incorrect: true, message: res.message});
        // TODO: PUT A ERROR TOASTER
      }
    });
  }
}
