import { TestBed } from '@angular/core/testing';

import { WeatherDetailResolverService } from './weather-detail-resolver.service';

describe('WeatherDetailResolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WeatherDetailResolverService = TestBed.get(WeatherDetailResolverService);
    expect(service).toBeTruthy();
  });
});
