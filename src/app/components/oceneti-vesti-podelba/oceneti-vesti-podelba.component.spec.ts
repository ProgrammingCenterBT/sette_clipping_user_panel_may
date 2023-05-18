import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OcenetiVestiPodelbaComponent } from './oceneti-vesti-podelba.component';

describe('OcenetiVestiPodelbaComponent', () => {
  let component: OcenetiVestiPodelbaComponent;
  let fixture: ComponentFixture<OcenetiVestiPodelbaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OcenetiVestiPodelbaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OcenetiVestiPodelbaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
