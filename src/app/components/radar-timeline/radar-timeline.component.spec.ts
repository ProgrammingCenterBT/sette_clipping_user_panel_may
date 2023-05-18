import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RadarTimelineComponent } from './radar-timeline.component';

describe('RadarTimelineComponent', () => {
  let component: RadarTimelineComponent;
  let fixture: ComponentFixture<RadarTimelineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RadarTimelineComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RadarTimelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
