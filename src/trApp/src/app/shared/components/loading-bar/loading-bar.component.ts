import { BehaviorSubject, ReplaySubject, Subject, takeWhile, takeUntil } from 'rxjs';
import { LoadingBarService } from './../../services/loading-bar.service';
import { Component, OnInit, TemplateRef, ViewChild, OnDestroy } from '@angular/core';
import { ngxLoadingAnimationTypes, NgxLoadingComponent } from 'ngx-loading';

const PrimaryRed = '#dd0031';

@Component({
  selector: 'app-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.css']
})
export class LoadingBarComponent implements OnInit, OnDestroy {
  public ngxLoadingAnimationTypes = ngxLoadingAnimationTypes;
  public primaryColour = PrimaryRed;
  public loadingTemplate!: TemplateRef<any>;

  onDestroy$ = new ReplaySubject<void>(1);

  loading = false;

  constructor(
    private readonly loadingBarService: LoadingBarService
  ) { }

  ngOnInit(): void {
    this.loadingBarService.showLoadingBar$.pipe(takeUntil(this.onDestroy$)).subscribe(value => {
      this.loading = value;
    });
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

}
