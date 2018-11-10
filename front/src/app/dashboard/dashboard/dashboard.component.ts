import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from 'src/app/api/models';
import { get, keys, map, set, mapValues } from 'lodash';
import { timer, Subscription } from 'rxjs';
import { WeatherService } from 'src/app/api/services';
import { take } from 'rxjs/operators';


@Component({
  selector: 'saa-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  data: any[];  // TODO: type this

  private timerSubscription: Subscription;
  private weatherSubscription: Subscription;
  private readonly refreshTime = 60000; // one minute

  constructor(
    private readonly weatherService: WeatherService
  ) { }

  ngOnInit() {  
    this.refreshData();
  }

  public ngOnDestroy(): void {
    if (this.weatherSubscription) {
        this.weatherSubscription.unsubscribe();
    }
    if (this.timerSubscription) {
        this.timerSubscription.unsubscribe();
    }
  }

  private refreshData(): void {
    this.weatherSubscription = this.weatherService
      .getApiWeatherIndex({ range: 'day' }).pipe(take(1))
      .subscribe((weather: Weather[]) => {
        this.data = this.getFormattedWeatherData(weather);
        this.subscribeToWeather();
      });
  }

  private subscribeToWeather(): void {
      this.timerSubscription = timer(this.refreshTime)
        .subscribe(() => this.refreshData());
  }

  getFormattedWeatherData(weatherData: Weather[]): any[] {
    // data should contain name/value pair objects in an array
    const sortedData = {};
    let extremes = {};
    weatherData.forEach((element: Weather) => {
      const elementKeys = keys(element.data);
      elementKeys.forEach((elementKey: string) => {        
        if (!sortedData[elementKey]) sortedData[elementKey] = [];
        const value = get(element, `data.${elementKey}`);
        if (!get(extremes, elementKey)) {
          set(extremes, `${elementKey}.min`, value);
          set(extremes, `${elementKey}.max`, value);
        }
        if (value < extremes[elementKey].min) extremes[elementKey].min = value;
        if (value > extremes[elementKey].max) extremes[elementKey].max = value;
        sortedData[elementKey].push({
          name: new Date(<string>element.createdAt),
          value
        });

      });
    });

    return map(sortedData, (series, name) => {
      return { name, series, extremes: get(extremes, name) };
    });

  }

}
