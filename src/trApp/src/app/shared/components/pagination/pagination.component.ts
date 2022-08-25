import { Subject, ReplaySubject, combineLatest, takeUntil } from 'rxjs';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit, OnDestroy, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnChanges, AfterViewInit, OnDestroy {
  @Input() totalCount!: number;
  @Input() currentPage!: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  length = 10;
  pages: IPage[] = [];

  onChange$ = new Subject<void>();
  onAFterViewInit$ = new Subject<void>();
  private readonly onDestroy$ = new ReplaySubject<void>(1);

  constructor() {
    combineLatest([this.onAFterViewInit$, this.onChange$]).pipe(takeUntil(this.onDestroy$)).subscribe(() => {
      if (this.totalCount && this.totalCount > 0) {
        const cantPages = Math.trunc(this.totalCount / this.length);
        for (var i = 0; i < cantPages; i++) {
          this.pages.push({num: i + 1});
        }
        const remainder = this.totalCount % this.length;
        if (remainder > 0) {
          this.pages.push({num: this.pages.length + 1});
        }
      }
    });
  }

  ngAfterViewInit(): void {
    this.onAFterViewInit$.next();
  }

  ngOnChanges(): void {
    this.onChange$.next();
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  selectPage(num: number) {
    this.changePage.emit(num);
  }

  previousPage() {
    this.changePage.emit(this.currentPage -1);
  }

  nextPage() {
    this.changePage.emit(this.currentPage + 1);
  }
}

interface IPage {
  num: number;
}
