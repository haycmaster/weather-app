import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import Chart from 'chart.js/auto';
import { combineLatest, filter, take } from 'rxjs';
import {
  setForecastDaysAction,
  retrieveForecastWeatherAction,
  setLoadingFlagAction,
} from 'src/app/ngrx-store/actions';
import {
  selectForecastWeatherData,
  selectQuery,
} from 'src/app/ngrx-store/selector';
import { DailyData } from 'src/app/types/tomorrow.io/ForecastData';

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
    const forecastDays = 7;

    combineLatest([this.currentQuery$, this.forecastWeatherData$])
      .pipe(take(1))
      .subscribe(([curQuery, fData]) => {
        if (!fData) {
          this.store.dispatch(setForecastDaysAction({ days: forecastDays }));
          this.store.dispatch(setLoadingFlagAction({ data: true }));
          this.store.dispatch(
            retrieveForecastWeatherAction({ query: curQuery })
          );
        }
      });

    this.forecastWeatherData$
      .pipe(
        filter((data) => !!data),
        take(1)
      )
      .subscribe((forecastData) => {
        if (forecastData) {
          this.initChartData(forecastData.timelines.daily);
        }
      });
  }

  initChartData(forecastData: DailyData[]) {
    const dailyList = forecastData;
    if (forecastData) {
      try {
        let chartexist = this.forecastChart?.getchart('WeatherChart'); // <canvas> id
        if (chartexist != undefined) chartexist.destroy();
      } catch (err) {}

      this.forecastChart = new Chart('WeatherChart', {
        type: 'line',
        data: {
          // values on X-Axis
          labels: dailyList.map((daily) => daily.time),
          datasets: [
            {
              label: 'High',
              data: dailyList.map(
                (fday) => fday.values.temperatureApparentMax + ''
              ),
              backgroundColor: 'orange',
              fill: false,
              borderColor: 'red',
              tension: 0.1,
            },
            {
              label: 'Low',
              data: dailyList.map(
                (fday) => fday.values.temperatureApparentMin + ''
              ),
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
