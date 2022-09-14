import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventSideBarComponent } from './event-side-bar.component';

describe('EventSideBarComponent', () => {
  let component: EventSideBarComponent;
  let fixture: ComponentFixture<EventSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventSideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
