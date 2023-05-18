import { TestBed } from '@angular/core/testing';

import { ChartsModelMediumTypeService } from './charts-model-medium-type.service';

describe('ChartsModelMediumTypeService', () => {
  let service: ChartsModelMediumTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelMediumTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
