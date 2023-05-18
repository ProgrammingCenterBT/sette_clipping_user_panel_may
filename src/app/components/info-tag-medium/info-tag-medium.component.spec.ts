import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoTagMediumComponent } from './info-tag-medium.component';

describe('InfoTagMediumComponent', () => {
  let component: InfoTagMediumComponent;
  let fixture: ComponentFixture<InfoTagMediumComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoTagMediumComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoTagMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
