import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoDenTagComponent } from './info-po-den-tag.component';

describe('InfoPoDenTagComponent', () => {
  let component: InfoPoDenTagComponent;
  let fixture: ComponentFixture<InfoPoDenTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoDenTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoDenTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
