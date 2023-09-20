import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './appState';

const selectAppState = createFeatureSelector<AppState>('appState');

export const selectQuery = createSelector(
  selectAppState,
  (state) => state.query
);

export const selectCurrentWeather = createSelector(
  selectAppState,
  (state) => state.currentWeather
);

export const selectForecastDays = createSelector(
  selectAppState,
  (state) => state.forecastDays
);

export const selectForecastWeatherData = createSelector(
  selectAppState,
  (state) => state.forecastWeather
);
