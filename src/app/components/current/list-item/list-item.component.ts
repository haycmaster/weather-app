import { Component, Input, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subject, takeUntil } from 'rxjs';
import { ItemData } from 'src/app/types/itemData';

@Component({
  selector: 'wa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnInit {
  @Input() itemData$: Observable<ItemData>;

  destroy$ = new Subject();
  item: ItemData = null;
  title$ = new BehaviorSubject<string>(null);
  value$ = new BehaviorSubject<string>(null);
  desc$ = new BehaviorSubject<string>(null);

  ngOnInit(): void {
    this.itemData$.pipe(takeUntil(this.destroy$)).subscribe((curItem) => {
      if (curItem) {
        this.title$.next(curItem.title);
        this.value$.next(curItem.value);
        this.desc$.next(curItem.desc);
      }
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next('');
  }
}
