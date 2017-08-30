import { TestBed, inject } from '@angular/core/testing';

import { TravelPlanProviderService } from './travel-plan-provider.service';

describe('TravelPlanProviderService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TravelPlanProviderService]
    });
  });

  it('should be created', inject([TravelPlanProviderService], (service: TravelPlanProviderService) => {
    expect(service).toBeTruthy();
  }));
});
