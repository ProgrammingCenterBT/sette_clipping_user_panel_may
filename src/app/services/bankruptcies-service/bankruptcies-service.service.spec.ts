import { TestBed } from '@angular/core/testing';

import { BankruptciesServiceService } from './bankruptcies-service.service';

describe('BankruptciesServiceService', () => {
  let service: BankruptciesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BankruptciesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
