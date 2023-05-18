import { TestBed } from '@angular/core/testing';

import { ChartsModelTagByMediumService } from './charts-model-tag-by-medium.service';

describe('ChartsModelTagByMediumService', () => {
  let service: ChartsModelTagByMediumService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelTagByMediumService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
