import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { filter, take, tap } from 'rxjs';
import {
  setForecastDaysAction,
  retrieveForecastWeatherAction,
  setLoadingFlagAction,
} from 'src/app/ngrx-store/actions';
import {
  selectForecastWeatherData,
  selectQuery,
} from 'src/app/ngrx-store/selector';
import { WeatherData, Forecast } from 'src/app/types/weatherData';

@Component({
  selector: 'wa-forecast-tab',
  templateUrl: './forecast-tab.component.html',
  styleUrls: ['./forecast-tab.component.scss'],
})
export class ForecastTabComponent implements OnInit {
  currentQuery$ = this.store.select(selectQuery);
  forecastWeatherData$ = this.store.pipe(select(selectForecastWeatherData));
  chart: any;
  forecastChart: any;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.initObserverable();
  }

  initObserverable() {
    const forecastDays = 8;
    this.currentQuery$.subscribe((curQuery) => {
      this.store.dispatch(setForecastDaysAction({ days: forecastDays }));
      this.store.dispatch(setLoadingFlagAction({ data: true }));
      this.store.dispatch(
        retrieveForecastWeatherAction({ query: curQuery, days: forecastDays })
      );
    });

    this.forecastWeatherData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((forecastData) => {
        if (forecastData) {
          this.initChartData(forecastData);
        }
      });
  }

  initChartData(forecastData: WeatherData) {
    const fData = forecastData?.forecast;
    if (forecastData) {
      try {
        let chartexist = this.forecastChart?.getchart('WeatherChart'); // <canvas> id
        if (chartexist != undefined) chartexist.destroy();
      } catch (err) {}

      this.forecastChart = new Chart('WeatherChart', {
        type: 'line',
        data: {
          // values on X-Axis
          labels: fData.forecastday.map((fday) => fday.date),
          datasets: [
            {
              label: 'High',
              data: fData.forecastday.map((fday) => fday.day.maxtemp_c + ''),
              backgroundColor: 'orange',
              fill: false,
              borderColor: 'red',
              tension: 0.1,
            },
            {
              label: 'Low',
              data: fData.forecastday.map((fday) => fday.day.mintemp_c + ''),
              fill: false,
              backgroundColor: 'lightblue',
              borderColor: 'blue',
              tension: 0.1,
            },
          ],
        },

        options: {
          aspectRatio: 1.6,
        },
      });
    }
  }
}
