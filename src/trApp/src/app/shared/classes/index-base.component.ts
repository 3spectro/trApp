import { IGenericResponse } from './../domain/core.entity';
import { Observable } from 'rxjs';
import { MessagesService } from './../services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Component } from "@angular/core";

@Component({
  selector: 'app-index',
  template: '',
  styles: []
})
export class IndexBaseComponent<T> {
  items: T[] = [];
  selectedItem!: T;
  isUpdate!: boolean;

  name!: string;

  getAll$!: Observable<IGenericResponse<T[]>>;
  getIndexFromId$!: Observable<number>;
  getEmpty$!: Observable<T>;
  delete$!: Observable<IGenericResponse<boolean>>;
  removeFromArray$!: Observable<T[]>;

  constructor(
    readonly toastr: ToastrService,
    private readonly messagesService: MessagesService,
  ) { }

  init(): void {
    this.getAll$.subscribe(res => this.items = res.value);
  }

  newItem() {
    this.isUpdate = false;
    this.getEmpty$.subscribe(x => this.selectedItem = x);
  }

  selectItem(item: T) {
    this.isUpdate = true;
    this.selectedItem = item;
  }

  deleteItem() {
    this.delete$.subscribe(res => {
      if (res.status) {
        this.removeFromArray$.subscribe(x => this.items = x);
        this.getEmpty$.subscribe(x => this.selectedItem = x);
        this.toastr.success(this.messagesService.getDeleteMessage(this.name));
      }
    });
  }

  saveItem(item: T) {
    if (this.isUpdate) {
      this.getIndexFromId$.subscribe(index => this.items[index] = item);
    } else {
      this.items.push(item);
    }
  }
}
