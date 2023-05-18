import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoTagPieComponent } from './info-po-tag-pie.component';

describe('InfoPoTagPieComponent', () => {
  let component: InfoPoTagPieComponent;
  let fixture: ComponentFixture<InfoPoTagPieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoTagPieComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoTagPieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
