import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoDenMediumComponent } from './info-po-den-medium.component';

describe('InfoPoDenMediumComponent', () => {
  let component: InfoPoDenMediumComponent;
  let fixture: ComponentFixture<InfoPoDenMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoDenMediumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoDenMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
