import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, of, takeUntil } from 'rxjs';
import { selectCurrentWeather } from 'src/app/ngrx-store/selector';
import { ItemData } from 'src/app/types/itemData';
import { WeatherData } from 'src/app/types/weatherData';

@Component({
  selector: 'wa-current-panel',
  templateUrl: './current-panel.component.html',
  styleUrls: ['./current-panel.component.scss'],
})
export class CurrentPanelComponent implements OnInit, OnDestroy {
  cityName = '';
  region = '';
  temp$ = new Subject<ItemData>();
  feelslike$ = new Subject<ItemData>();
  wind$ = new Subject<ItemData>();
  vis$ = new Subject<ItemData>();
  uv$ = new Subject<ItemData>();
  gust_mph = new Subject<ItemData>();

  currentWeather$ = this.store.select(selectCurrentWeather);
  destroy$ = new Subject();
  constructor(private store: Store<any>) {}

  ready$ = new Subject();
  localTime = '';

  ngOnInit() {
    this.currentWeather$.pipe(takeUntil(this.destroy$)).subscribe((value) => {
      console.log('currentWeather$: ', value);
      this.initialItems(value);
      this.ready$.next(true);
    });
  }

  initialItems(weatherData: WeatherData) {
    const location = weatherData?.location;
    const current = weatherData?.current;

    this.temp$.next({
      title: 'Temperature',
      value: current?.temp_c + '',
      desc: '°C',
    });

    this.feelslike$.next({
      title: 'Feels like',
      value: current?.feelslike_c + '',
      desc: '°C',
    });

    this.wind$.next({
      title: 'Wind',
      value: '' + current?.wind_kph,
      desc: ' km/h ' + current?.wind_dir,
    });

    this.cityName = location?.name;
    this.region = location?.region;
    const time = new Date(location?.localtime);
    this.localTime = time.toString();
  }
  ngOnDestroy(): void {
    this.destroy$.next('');
  }
}
