import { createAction, props } from '@ngrx/store';
import { WeatherData } from '../types/weatherData';

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
  props<WeatherData>()
);

export const addErrorAction = createAction(
  '[addErrorAction] Add Error',
  props<any>()
);

export const reset = createAction('[Reset] Reset');
