import { Injectable } from '@angular/core';
import { Weather } from 'src/app/api/models';
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { WeatherService } from 'src/app/api/services';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class WeatherDetailResolverService implements Resolve<Weather[]> {

  constructor(private readonly weatherService: WeatherService) { }

  resolve(): Observable<Weather[]> | Observable<never> {
    // use take(1) to ensure that the Observable completes after retrieving the first value
    return this.weatherService.getApiWeatherIndex({ range: 'day' }).pipe(take(1));
  };

}
