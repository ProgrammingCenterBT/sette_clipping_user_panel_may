import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenetiVestiProcentiComponent } from './oceneti-vesti-procenti.component';

describe('OcenetiVestiProcentiComponent', () => {
  let component: OcenetiVestiProcentiComponent;
  let fixture: ComponentFixture<OcenetiVestiProcentiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenetiVestiProcentiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcenetiVestiProcentiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
