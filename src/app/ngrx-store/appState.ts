import { WeatherData } from '../types/weatherData';

export interface AppState {
  query: string;
  loading: boolean;
  currentWeather: WeatherData;
  error: any;
}
