import { TestBed } from '@angular/core/testing';

import { ChartsModelTagService } from './charts-model-tag.service';

describe('ChartsModelTagService', () => {
  let service: ChartsModelTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
