import { TestBed, inject } from '@angular/core/testing';

import { SearchByYelpService } from './search-by-yelp.service';

describe('SearchByYelpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchByYelpService]
    });
  });

  it('should be created', inject([SearchByYelpService], (service: SearchByYelpService) => {
    expect(service).toBeTruthy();
  }));
});
