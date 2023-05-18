import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrojNaInfoComponent } from './broj-na-info.component';

describe('BrojNaInfoComponent', () => {
  let component: BrojNaInfoComponent;
  let fixture: ComponentFixture<BrojNaInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrojNaInfoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BrojNaInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
