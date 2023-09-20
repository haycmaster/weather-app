import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiWrapper } from '../types/api-wrapper';
import { Observable, of } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { addErrorAction } from '../ngrx-store/actions';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ApiWrapperService {
  constructor(
    private http: HttpClient,
    private store: Store<any>,
    private toastr: ToastrService
  ) {}

  private catch<T>(result: any): Observable<any> {
    const error = result.error.error;
    if (error.message) {
      this.store.dispatch(addErrorAction(result.error));
      this.toastr.error(error.message, error.code);
    }
    return of(result.error);
  }
  post<T>(url: string, body: any): Observable<T> {
    return this.http
      .post<ApiWrapper<T>>(url, body)
      .pipe(switchMap((result) => this.catch(result)));
  }
  get<T>(url: string): Observable<any> {
    return this.http.get<ApiWrapper<T>>(url).pipe(
      switchMap((result) => {
        return of(result);
      }),
      catchError((err) => {
        return this.catch(err);
      })
    );
  }
}
