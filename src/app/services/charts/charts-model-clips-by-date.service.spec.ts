import { TestBed } from '@angular/core/testing';

import { ChartsModelClipsByDateService } from './charts-model-clips-by-date.service';

describe('ChartsModelClipsByDateService', () => {
  let service: ChartsModelClipsByDateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelClipsByDateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
