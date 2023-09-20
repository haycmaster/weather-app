import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../service/api-service';
import {
  addCurrentWeatherDataAction,
  retrieveCurrentWeatherAction,
  setLoadingFlagAction,
  retrieveForecastWeatherAction,
  addForecastWeatherAction,
} from './actions';
import { of } from 'rxjs';

@Injectable()
export class effects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadLspDataRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCurrentWeatherAction),
      switchMap((action) =>
        this.apiService
          .retrieveCurrentWeatherWrapper(action.data)
          .pipe(
            switchMap((result) => [
              addCurrentWeatherDataAction(result),
              setLoadingFlagAction({ data: false }),
            ])
          )
      )
    )
  );

  loadForecastRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveForecastWeatherAction),
      switchMap((action) =>
        this.apiService
          .retrieveForecastWeatherWrapper(action.query, action.days)
          .pipe(
            switchMap((result) => [
              addForecastWeatherAction(result),
              setLoadingFlagAction({ data: false }),
            ])
          )
      )
    )
  );
}
