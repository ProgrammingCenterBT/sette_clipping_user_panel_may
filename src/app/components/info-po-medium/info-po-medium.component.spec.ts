import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoMediumComponent } from './info-po-medium.component';

describe('InfoPoMediumComponent', () => {
  let component: InfoPoMediumComponent;
  let fixture: ComponentFixture<InfoPoMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoMediumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
