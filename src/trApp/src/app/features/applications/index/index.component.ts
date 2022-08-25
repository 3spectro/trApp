import { MessagesService } from './../../../shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from 'src/app/shared/services/applications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  applications?: IApplication[] = [];
  selectedApp!: IApplication;

  constructor(
    private readonly toastr: ToastrService,
    private readonly applicationsService: ApplicationsService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.applicationsService.get$().subscribe(res =>{
      if (res.status === 200) {
        this.applications = res.value;
      }
    });
  }

  newApp() {
    this.selectedApp = {} as IApplication;
  }

  selectApp(app: IApplication) {
    this.selectedApp = app;
  }

  deleteApplication() {
    this.applicationsService.delete$(this.selectedApp.id).subscribe(res => {
      if (res.status === 200) {
        this.applications?.filter(x => x.id !== this.selectedApp.id);
        this.selectedApp = {} as IApplication;
        this.toastr.success(this.messagesService.getDeleteMessage('Application'));
      }
    });
  }

  newApplication(app: IApplication) {
    this.applicationsService.save$(app).subscribe(response => {
      if (response.status === 201) {
        this.applications?.push(response.value);
        this.toastr.success(this.messagesService.getDeleteMessage('Application'));
      } else {
        alert(response.message);
      }
    });
  }
}
