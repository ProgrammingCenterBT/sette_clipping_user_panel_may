import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoPoAvtorComponent } from './info-po-avtor.component';

describe('InfoPoAvtorComponent', () => {
  let component: InfoPoAvtorComponent;
  let fixture: ComponentFixture<InfoPoAvtorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InfoPoAvtorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InfoPoAvtorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
