import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoTagComponent } from './info-po-tag.component';

describe(' InfoPoTagComponent', () => {
  let component:  InfoPoTagComponent;
  let fixture: ComponentFixture< InfoPoTagComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [  InfoPoTagComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent( InfoPoTagComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
