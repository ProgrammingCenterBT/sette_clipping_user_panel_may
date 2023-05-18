import { TestBed } from '@angular/core/testing';

import { ChartsModelAuthorService } from './charts-model-author.service';

describe('ChartsModelAutorService', () => {
  let service: ChartsModelAuthorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChartsModelAuthorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
