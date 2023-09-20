import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
// import { forkJoin, Observable, of } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { ApiService } from '../service/api-service';
import {
  addCurrentWeatherDataAction,
  retrieveCurrentWeatherAction,
  setLoadingFlagAction,
} from './actions';

@Injectable()
export class effects {
  constructor(private actions$: Actions, private apiService: ApiService) {}

  loadLspDataRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(retrieveCurrentWeatherAction),
      switchMap((action) =>
        this.apiService.retrieveCurrentWeatherWrapper(action.data).pipe(
          // tap((result) => console.log('In effects, result: ', result)),
          switchMap((result) => [
            addCurrentWeatherDataAction(result),
            setLoadingFlagAction({ data: false }),
          ])
        )
      )
    )
  );
}
