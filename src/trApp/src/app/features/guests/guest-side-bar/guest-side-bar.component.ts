import { SideBarBaseComponent } from './../../../shared/components/side-bar-base/side-bar-base.component';
import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IGenericResponse } from './../../../shared/domain/core.entity';
import { Observable } from 'rxjs';
import { IGuest, GuestsService } from '../../../shared/services/guests.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, AfterViewInit, OnInit, OnChanges, OnDestroy, Renderer2 } from '@angular/core';
import { RegEx } from 'src/app/shared/domain/enums/regex.enum'
import { Features } from 'src/app/shared/domain/enums/features.enum';

@Component({
  selector: 'app-guest-side-bar',
  templateUrl: './guest-side-bar.component.html',
  styleUrls: ['./guest-side-bar.component.css']
})
export class GuestSideBarComponent extends SideBarBaseComponent<IGuest> implements OnInit, AfterViewInit, OnChanges, OnDestroy {

  constructor(
    renderer: Renderer2,
    toastr: ToastrService,
    messagesService: MessagesService,
    private readonly fb: FormBuilder,
    private readonly service: GuestsService,
  ) {
    super(renderer, toastr, messagesService);
    this.name = Features.GUEST;
    this.initForm();
    this.setIsUpdate();
  }

  private initForm(): void {
    this.initForm$ = new Observable<void>(observer => {
      this.form = this.fb.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        passport: ['', [Validators.required, Validators.min(9), Validators.max(9)]],
        email: ['', [Validators.pattern(RegEx.EMAIL)]],
        celPhone: ['', []],
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
    let app = this.getItem();
    this.getAction(app).subscribe(res => {
      this.processResult(app, res);
    });
  }

  private getItem(): IGuest {
    return {
      id: this.item.id,
      firstName: this.form.value['firstName'].toString(),
      lastName: this.form.value['lastName'].toString(),
      passport: this.form.value['passport'] ? this.form.value['passport'].toString() : null,
      email: this.form.value['email'] ? this.form.value['email'].toString() : null,
      celPhone: this.form.value['celPhone'] ? this.form.value['celPhone'].toString() : null,
    }
  }

  private getAction(app: IGuest): Observable<IGenericResponse<number>> {
    return !this.isUpdate ? this.service.save$(app) : this.service.update$(app)
  }
}
