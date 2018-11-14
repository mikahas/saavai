import { Injectable } from '@angular/core';
import { Weather } from 'src/app/api/models';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/api/services';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherLocationsResolverService implements Resolve<string[]> {

  constructor(private readonly weatherService: WeatherService) { }

  resolve(): Observable<string[]> | Observable<never> {
    return this.weatherService.getApiWeatherLocations().pipe(take(1));
  };

}
