import { TestBed } from '@angular/core/testing';

import { WeatherLocationsResolverService } from './weather-locations-resolver.service';

describe('WeatherLocationsResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherLocationsResolverService = TestBed.get(WeatherLocationsResolverService);
    expect(service).toBeTruthy();
  });
});
