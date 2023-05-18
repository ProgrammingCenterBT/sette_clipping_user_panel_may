import { TestBed } from '@angular/core/testing';

import { ChartsModelClipsByTagByDateService } from './charts-model-clips-by-tag-by-date.service';

describe('ChartsModeClipsByTagByDateService', () => {
  let service: ChartsModelClipsByTagByDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelClipsByTagByDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
