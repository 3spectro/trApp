import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DateRangeFormComponent } from './date-range-form.component';

describe('DateRangeFormComponent', () => {
  let component: DateRangeFormComponent;
  let fixture: ComponentFixture<DateRangeFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DateRangeFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DateRangeFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
