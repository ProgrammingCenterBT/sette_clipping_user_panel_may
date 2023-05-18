import { TestBed } from '@angular/core/testing';

import { ChartsModelMediumService } from './charts-model-medium.service';

describe('ChartsModelMediumService', () => {
  let service: ChartsModelMediumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelMediumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
