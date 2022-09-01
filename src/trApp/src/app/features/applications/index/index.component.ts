import { MessagesService } from 'src/app/shared/services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { IApplication, ApplicationsService } from 'src/app/shared/services/applications.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  applications: IApplication[] = [];
  selectedApp!: IApplication;
  isUpdate!: boolean;

  constructor(
    private readonly toastr: ToastrService,
    private readonly service: ApplicationsService,
    private readonly messagesService: MessagesService
  ) { }

  ngOnInit(): void {
    this.service.get$().subscribe(res =>{
      debugger;
      this.applications = res.value;
    });
  }

  newApp() {
    this.isUpdate = false;
    this.selectedApp = this.service.getEmptyApplication();
  }

  selectApp(app: IApplication) {
    this.isUpdate = true;
    this.selectedApp = app;
  }

  deleteApplication() {
    this.service.delete$(this.selectedApp.id).subscribe(res => {
      if (res.status) {
        this.applications = this.applications?.filter(x => x.id !== this.selectedApp.id);
        this.selectedApp = this.service.getEmptyApplication();
        this.toastr.success(this.messagesService.getDeleteMessage('Application'));
      }
    });
  }

  saveApplication(app: IApplication) {
    if (this.isUpdate) {
      const index = this.applications?.findIndex(x => x.id == this.selectedApp.id);
      this.applications[index] = app;
    } else {
      this.applications.push(app);
    }
  }

  search() {
    this.service.get$().subscribe(res =>{
      this.applications = res.value;
    });
  }
}
