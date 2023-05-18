import { TestBed } from '@angular/core/testing';

import { FavoritePagesService } from './favorite-pages.service';

describe('FavoritePagesService', () => {
  let service: FavoritePagesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritePagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
