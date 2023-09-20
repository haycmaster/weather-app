import {
  AfterViewInit,
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { Store } from '@ngrx/store';
import { ToastrService } from 'ngx-toastr';
import {
  retrieveCurrentWeatherAction,
  setLoadingFlagAction,
} from 'src/app/ngrx-store/actions';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'wa-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('queryInput') queryInputField: ElementRef;
  tabLoadTimes: Date[] = [];

  constructor(
    private store: Store<any>,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  searchForm = this.fb.group({
    query: ['M2N'],
  });

  ngAfterViewInit() {
    this.queryInputField.nativeElement.focus();
  }
  onSubmit() {
    const query = this.searchForm.value.query?.trim();
    if (query) {
      this.store.dispatch(setLoadingFlagAction({ data: true }));
      this.store.dispatch(retrieveCurrentWeatherAction({ data: query }));
    } else {
      this.toastr.error('', 'Please provide location infomation');
    }
  }

  getTimeLoaded(index: number) {
    if (!this.tabLoadTimes[index]) {
      this.tabLoadTimes[index] = new Date();
    }

    return this.tabLoadTimes[index];
  }
}
