import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestSideBarComponent } from './guest-side-bar.component';

describe('SideBarComponent', () => {
  let component: GuestSideBarComponent;
  let fixture: ComponentFixture<GuestSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuestSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuestSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
