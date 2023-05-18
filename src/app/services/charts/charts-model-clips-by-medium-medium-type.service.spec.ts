import { TestBed } from '@angular/core/testing';

import { ChartsModelClipsByMediumMediumTypeService } from './charts-model-clips-by-medium-medium-type.service';

describe('ChartsModelClipsByMediumMediumTypeService', () => {
  let service: ChartsModelClipsByMediumMediumTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelClipsByMediumMediumTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
