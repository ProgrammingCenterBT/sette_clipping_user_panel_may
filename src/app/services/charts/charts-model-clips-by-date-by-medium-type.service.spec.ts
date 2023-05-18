import { TestBed } from '@angular/core/testing';

import { ChartsModelClipsByDateByMediumTypeService } from './charts-model-clips-by-date-by-medium-type.service';

describe('ChartsModelClipsByDateByMediumTypeService', () => {
  let service: ChartsModelClipsByDateByMediumTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelClipsByDateByMediumTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
