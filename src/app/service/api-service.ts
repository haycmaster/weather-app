import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WeatherData } from '../types/weatherData';
import { Observable } from 'rxjs';
import { ApiWrapperService } from './api-wrapper.service';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  // https://api.weatherapi.com/v1/current.json?q=Toronto&key=e7933d91dae045aca7c150409230709
  API_TOKEN = 'e7933d91dae045aca7c150409230709';
  RETRIEVE_DATA_FOR_TD_EXPRESS = `https://api.weatherapi.com/v1/current.json`;

  constructor(
    private httpClient: HttpClient,
    private apiWrapperService: ApiWrapperService
  ) {}

  // Make api call with Angular HttpClient
  retrieveCurrentWeather(query: string): Observable<WeatherData> {
    const url = `https://api.weatherapi.com/v1/current.json?q=${query}&key=${this.API_TOKEN}`;
    const getData$ = this.httpClient.get<WeatherData>(url);
    return getData$;
  }

  // Make api call with ApiWrapperService
  retrieveCurrentWeatherWrapper(query: string): Observable<WeatherData> {
    const url = `https://api.weatherapi.com/v1/current.json?q=${query}&key=${this.API_TOKEN}`;
    return this.apiWrapperService.get<WeatherData>(url);
  }

  retrieveForecastWeatherWrapper(
    query: string,
    days: number
  ): Observable<WeatherData> {
    const today = new Date();
    const year = today.toLocaleString('default', { year: 'numeric' });
    const month = today.toLocaleString('default', { month: '2-digit' });
    const day = today.toLocaleString('default', { day: '2-digit' });
    var fDate = `${year}-${month}-0${day}`;
    const url = `https://api.weatherapi.com/v1/forecast.json?q=${query}&days=${days}&dt=${fDate}&key=${this.API_TOKEN}`;
    return this.apiWrapperService.get<WeatherData>(url);
  }
}
