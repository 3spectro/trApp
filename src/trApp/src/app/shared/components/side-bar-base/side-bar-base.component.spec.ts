import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SideBarBaseComponent } from './side-bar-base.component';

describe('SideBarBaseComponent', () => {
  let component: SideBarBaseComponent;
  let fixture: ComponentFixture<SideBarBaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SideBarBaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SideBarBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
