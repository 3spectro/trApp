import { SideBarBaseComponent } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from './../../../shared/services/applications.service';
import { AfterViewInit, Component, OnChanges, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MessagesService } from 'src/app/shared/services/messages.service';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'

const NAME = 'Application';

@Component({
  selector: 'app-application-side-bar',
  templateUrl: './application-side-bar.component.html',
  styleUrls: ['./application-side-bar.component.css']
})
export class ApplicationSideBarComponent extends SideBarBaseComponent<IApplication> implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(
    renderer: Renderer2,
    toastr: ToastrService,
    messagesService: MessagesService,
    private readonly fb: FormBuilder,
    private readonly applicationsService: ApplicationsService,
  ) {
    super(renderer, toastr, messagesService);
    this.name = 'Application';
    this.initForm();
    this.setIsUpdate();
  }

  private initForm(): void {
    this.initForm$ = new Observable<void>(observer => {
      this.form = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3)]],
        url: ['', [Validators.required, Validators.pattern(RegEx.URL)]],
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
}
