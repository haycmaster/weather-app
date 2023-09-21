import { createAction, props } from '@ngrx/store';
import { ForecastData } from '../types/tomorrow.io/ForecastData';
import { RealTimeData } from '../types/tomorrow.io/realTimeData';

export const setLoadingFlagAction = createAction(
  '[setLoading] Set Loading Flag',
  props<{ data: boolean }>()
);

export const retrieveCurrentWeatherAction = createAction(
  '[retrieveCurrentWeather] Retrieve Current Weather',
  props<{ data: string }>()
);

export const addCurrentWeatherDataAction = createAction(
  '[addCurrentWeatherData] Add Current Weather Data',
  props<RealTimeData>()
);

export const setForecastDaysAction = createAction(
  '[setForecastDaysAction] Set Forecast Days',
  props<{ days: number }>()
);

export const retrieveForecastWeatherAction = createAction(
  '[retrieveForecastWeatherAction] Retrieve Forecast Weather',
  props<{ query: string }>()
);

export const addForecastWeatherAction = createAction(
  '[addForecastWeatherAction] Add Forecast Weather Data',
  props<ForecastData>()
);

export const addErrorAction = createAction(
  '[addErrorAction] Add Error',
  props<any>()
);

export const reset = createAction('[Reset] Reset');
