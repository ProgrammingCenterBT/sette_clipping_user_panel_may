import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TenderSidebarComponent } from './tender-sidebar.component';

describe('TenderSidebarComponent', () => {
  let component: TenderSidebarComponent;
  let fixture: ComponentFixture<TenderSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TenderSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TenderSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
