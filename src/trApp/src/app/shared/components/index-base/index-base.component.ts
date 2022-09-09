import { TranslateApiDataService } from './../../services/translate-api-data.service';
import { TranslateService } from '@ngx-translate/core';
import { ITranslate } from './../../domain/core.entity';
import { IGenericResponse } from '../../domain/core.entity';
import { Observable, takeUntil, AsyncSubject } from 'rxjs';
import { MessagesService } from '../../services/messages.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-index',
  template: '',
  styles: []
})
export class IndexBaseComponent<T> implements OnInit, OnDestroy {
  items: T[] = [];
  selectedItem!: T;
  isUpdate!: boolean;

  name!: string;

  ngOnDestroy$ = new AsyncSubject<void>();

  getAll$!: Observable<IGenericResponse<T[]>>;
  getIndexFromId$!: Observable<number>;
  getEmpty$!: Observable<T>;
  delete$!: Observable<IGenericResponse<boolean>>;
  removeFromArray$!: Observable<T[]>;
  translate$!: Observable<void>;

  confirmationMessageParam: ITranslate = {} as ITranslate;

  constructor(
    readonly toastr: ToastrService,
    private readonly messagesService: MessagesService,
    private readonly translateService: TranslateService,
    private readonly translateApiDataService: TranslateApiDataService
  ) {
    this.translateApiDataService.applyTranslation$.pipe(takeUntil(this.ngOnDestroy$)).subscribe(() => {
      if (this.translate$) {
        this.translate$.subscribe();
      }
    })
  }

  ngOnInit(): void {
    this.getAll$.subscribe(res => this.items = res.value);
    this.translateService.get(`${this.name.toLowerCase()}.entity`).subscribe((res: string) => {
      this.confirmationMessageParam.value = res.toLowerCase();
    });
  }

  ngOnDestroy(): void {
    this.ngOnDestroy$.next();
    this.ngOnDestroy$.complete();
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
    debugger;
    if (this.isUpdate) {
      this.getIndexFromId$.subscribe(index => this.items[index] = item);
    } else {
      this.items.push(item);
    }
  }
}
