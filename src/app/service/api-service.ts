import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, delay, of } from 'rxjs';
import { ApiWrapperService } from './api-wrapper.service';
import { RealTimeData } from '../types/tomorrow.io/realTimeData';
import { ForecastData } from '../types/tomorrow.io/ForecastData';
import { realTimeMockData } from 'src/assets/mockData/realTimeMockData';
import { forecastMockData } from 'src/assets/mockData/forecastMockData';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  API_TOKEN = 'OQhoLq5kIhjnbAAJyO5SkLMY3AGTetq7';

  constructor(
    private httpClient: HttpClient,
    private apiWrapperService: ApiWrapperService
  ) {}

  // Api call with Angular HttpClient
  retrieveCurrentWeather(query: string): Observable<RealTimeData> {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${query}&apikey=${this.API_TOKEN}`;
    const getData$ = this.httpClient.get<RealTimeData>(url);
    return getData$;
  }

  // Api call with ApiWrapperService
  retrieveCurrentWeatherWrapper(query: string): Observable<RealTimeData> {
    const url = `https://api.tomorrow.io/v4/weather/realtime?location=${query}&apikey=${this.API_TOKEN}`;
    const prodMode = false; // true/false
    return prodMode
      ? this.apiWrapperService.get<RealTimeData>(url)
      : of(realTimeMockData).pipe(delay(500));
  }

  retrieveForecastWeatherWrapper(query: string): Observable<ForecastData> {
    const today = new Date();
    const url = `https://api.tomorrow.io/v4/weather/forecast?location=${query}&apikey=${this.API_TOKEN}`;
    const prodMode = false;
    return prodMode
      ? this.apiWrapperService.get<ForecastData>(url)
      : of(forecastMockData).pipe(delay(500));
  }
}
