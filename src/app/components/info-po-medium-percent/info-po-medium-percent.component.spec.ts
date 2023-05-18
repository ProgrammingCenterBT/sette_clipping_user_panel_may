import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoMediumPercentComponent } from './info-po-medium-percent.component';

describe('InfoPoMediumPercentComponent', () => {
  let component: InfoPoMediumPercentComponent;
  let fixture: ComponentFixture<InfoPoMediumPercentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoMediumPercentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoMediumPercentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
