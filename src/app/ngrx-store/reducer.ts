import { MetaReducer, createReducer, on } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import {
  setLoadingFlagAction,
  reset,
  retrieveCurrentWeatherAction,
  addCurrentWeatherDataAction,
  addErrorAction,
} from 'src/app/ngrx-store/actions';
import { AppState } from './appState';

export const initialState: AppState = {
  query: '',
  loading: false,
  currentWeather: null,
  error: null,
};

const environment = {
  production: false,
};

export const metaReducers: MetaReducer<any>[] = !environment.production
  ? [storeFreeze]
  : [];

export const reducer = createReducer(
  initialState,
  on(setLoadingFlagAction, (state, action) => ({
    ...state,
    loading: action.data,
  })),
  on(retrieveCurrentWeatherAction, (state, action) => ({
    ...state,
    query: action.data,
  })),
  on(addCurrentWeatherDataAction, (state, action) => ({
    ...state,
    currentWeather: action,
  })),
  on(addErrorAction, (state, action) => ({
    ...state,
    error: action,
  })),
  on(reset, (state) => initialState)
);
