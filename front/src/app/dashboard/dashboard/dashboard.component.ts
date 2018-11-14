import { Component, OnInit, OnDestroy } from '@angular/core';
import { Weather } from 'src/app/api/models';
import { get, keys, map, set, reduce } from 'lodash';
import { timer, Subscription, forkJoin } from 'rxjs';
import { WeatherService } from 'src/app/api/services';
import { ActivatedRoute } from '@angular/router';


@Component({
	selector: 'saa-dashboard',
	templateUrl: './dashboard.component.html',
	styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

	data: any[];  // TODO: type this
	latestData: any[] = [];
	locations: string[];
	isLoading: boolean = false;

	private activeLocation: string;
	private timerSubscription: Subscription;
	private weatherSubscription: Subscription;
	private readonly refreshTime = 600000; // ten minutes

	constructor(
		private readonly weatherService: WeatherService,
		private route: ActivatedRoute
	) { }

	ngOnInit() {
		this.locations = this.route.snapshot.data['locations'];
		if (this.locations.length) {
			this.activeLocation = this.locations[0];
			this.refreshData();
		}
	}

	public ngOnDestroy(): void {

		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}

		if (this.weatherSubscription) {
			this.weatherSubscription.unsubscribe();
		}

	}

	private refreshData(): void {
		this.isLoading = true;
		this.latestData = [];
		const weather$ = this.weatherService
			.getApiWeatherIndex({ range: 'day', location: this.activeLocation });

		const latest$ = this.weatherService
			.getApiWeatherLatest(this.activeLocation);

		this.weatherSubscription = forkJoin(weather$, latest$)
			.subscribe(([weather, latest]: [Weather[], Weather[]] ) => {
				this.isLoading = false;
				this.data = this.getFormattedWeatherData(weather);
				if (latest.length) this.latestData = this.getFormatLatest(latest.pop());
				this.subscribeToWeather();
			});

	}

	private getFormatLatest(weather: Weather) {
		return reduce(weather.data, (reducer, value, key) => {
			reducer.push({
				name: key,
				value: value
			});
			return reducer;
		}, []);
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

	doRefresh() {
		if (this.timerSubscription) {
			this.timerSubscription.unsubscribe();
		}
		this.refreshData();
	}

}
