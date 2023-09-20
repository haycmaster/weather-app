import { WeatherData } from '../types/weatherData';

export interface AppState {
  query: string;
  loading: boolean;
  forecastDays: number;
  currentWeather: WeatherData;
  forecastWeather: WeatherData;
  error: any;
}
