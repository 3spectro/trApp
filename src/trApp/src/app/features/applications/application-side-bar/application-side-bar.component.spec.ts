import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplicationSideBarComponent } from './application-side-bar.component';

describe('ApplicationSideBarComponent', () => {
  let component: ApplicationSideBarComponent;
  let fixture: ComponentFixture<ApplicationSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplicationSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplicationSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
