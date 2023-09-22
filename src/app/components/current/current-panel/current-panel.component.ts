import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Subject, of, takeUntil } from 'rxjs';
import { selectRealTimeWeather } from 'src/app/ngrx-store/selector';
import { ItemData } from 'src/app/types/itemData';
import { RealTimeData } from 'src/app/types/tomorrow.io/realTimeData';

@Component({
  selector: 'wa-current-panel',
  templateUrl: './current-panel.component.html',
  styleUrls: ['./current-panel.component.scss'],
})
export class CurrentPanelComponent implements OnInit, OnDestroy {
  cityName = '';
  temp$ = new BehaviorSubject<ItemData>(null);
  feelslike$ = new BehaviorSubject<ItemData>(null);
  wind$ = new BehaviorSubject<ItemData>(null);
  vis$ = new BehaviorSubject<ItemData>(null);
  uv$ = new BehaviorSubject<ItemData>(null);
  gust_mph = new BehaviorSubject<ItemData>(null);

  realTimeWeather$ = this.store.select(selectRealTimeWeather);
  destroy$ = new Subject();
  constructor(private store: Store<any>) {}

  localTime = '';

  ngOnInit() {
    this.realTimeWeather$.pipe().subscribe((value) => {
      this.initialItems(value);
    });
  }

  initialItems(realTime: RealTimeData) {
    const location = realTime?.location;
    const values = realTime?.data.values;

    this.temp$.next({
      title: 'Temperature',
      value: values?.temperature + '',
      desc: '°C',
    });

    this.feelslike$.next({
      title: 'Feels like',
      value: values?.temperatureApparent + '',
      desc: '°C',
    });

    this.wind$.next({
      title: 'Wind',
      value: '' + values?.windSpeed,
      desc: ' km/h ',
    });

    this.cityName = location?.name;
    const time = new Date(realTime?.data.time);
    this.localTime = time.toString();
  }
  ngOnDestroy(): void {
    this.destroy$.next('');
  }
}
