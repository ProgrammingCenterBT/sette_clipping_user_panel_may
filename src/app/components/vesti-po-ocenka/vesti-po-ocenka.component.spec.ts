import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VestiPoOcenkaComponent } from './vesti-po-ocenka.component';

describe('VestiPoOcenkaComponent', () => {
  let component: VestiPoOcenkaComponent;
  let fixture: ComponentFixture<VestiPoOcenkaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VestiPoOcenkaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VestiPoOcenkaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
