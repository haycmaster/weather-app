import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './appState';

const selectAppState = createFeatureSelector<AppState>('appState');

export const selectQuery = createSelector(
  selectAppState,
  (state) => state.query
);

export const selectRealTimeWeather = createSelector(
  selectAppState,
  (state) => state.realTimeWeather
);

export const selectForecastDays = createSelector(
  selectAppState,
  (state) => state.forecastDays
);

export const selectForecastWeatherData = createSelector(
  selectAppState,
  (state) => state.forecastData
);
