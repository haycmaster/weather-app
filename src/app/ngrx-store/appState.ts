import { ForecastData } from '../types/tomorrow.io/ForecastData';
import { RealTimeData } from '../types/tomorrow.io/realTimeData';

export interface AppState {
  query: string;
  loading: boolean;
  forecastDays: number;
  realTimeWeather: RealTimeData;
  forecastData: ForecastData;
  error: any;
}
