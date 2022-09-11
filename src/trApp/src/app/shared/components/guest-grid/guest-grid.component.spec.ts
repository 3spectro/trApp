import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestGridComponent } from './guest-grid.component';

describe('GuestGridComponent', () => {
  let component: GuestGridComponent;
  let fixture: ComponentFixture<GuestGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
