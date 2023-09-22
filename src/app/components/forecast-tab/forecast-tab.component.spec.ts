import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTabComponent } from './forecast-tab.component';

describe('ForecastTabComponent', () => {
  let component: ForecastTabComponent;
  let fixture: ComponentFixture<ForecastTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ForecastTabComponent]
    });
    fixture = TestBed.createComponent(ForecastTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
