import { TestBed } from '@angular/core/testing';

import { ClipTagService } from './clip-tag.service';

describe('ClipTagService', () => {
  let service: ClipTagService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClipTagService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
