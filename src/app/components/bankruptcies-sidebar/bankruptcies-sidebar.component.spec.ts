import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BankruptciesSidebarComponent } from './bankruptcies-sidebar.component';

describe('BankruptciesSidebarComponent', () => {
  let component: BankruptciesSidebarComponent;
  let fixture: ComponentFixture<BankruptciesSidebarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BankruptciesSidebarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BankruptciesSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
