import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from './appState';

const selectAppState = createFeatureSelector<AppState>('appState');

export const selectCurrentWeather = createSelector(
  selectAppState,
  (state) => state.currentWeather
);
