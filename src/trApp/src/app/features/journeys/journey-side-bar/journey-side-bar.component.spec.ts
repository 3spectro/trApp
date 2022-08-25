import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JouernySideBarComponent } from './journey-side-bar.component';

describe('TravelSideBarComponent', () => {
  let component: JouernySideBarComponent;
  let fixture: ComponentFixture<JouernySideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JouernySideBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JouernySideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
