import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from 'src/app/api/models';
import { ActivatedRoute } from '@angular/router';
import { get, keys, map } from 'lodash';
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
  private readonly refreshTime = 60000;

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
      .getApiWeatherIndex({ range: 'day', from: '2018-11-11' }).pipe(take(1))
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
    weatherData.forEach((element: Weather) => {
      const elementKeys = keys(element.data);
      elementKeys.forEach((elementKey: string) => {
        
        if (!sortedData[elementKey]) sortedData[elementKey] = [];
        sortedData[elementKey].push({
          value: get(element, `data.${elementKey}`),
          name: new Date(<string>element.createdAt)
        });

      });
    });

    return map(sortedData, (element, key) => {
      return {
        name: key,
        series: element
      };
    });

  }

}
