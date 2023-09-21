import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ItemData } from 'src/app/types/itemData';

@Component({
  selector: 'wa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent implements OnChanges {
  @Input() itemData: ItemData;

  title = '';
  value = '';
  desc = '';

  ngOnChanges(changes: SimpleChanges) {
    const curItemData = changes['itemData'].currentValue;
    this.title = curItemData?.title;
    this.value = curItemData?.value;
    this.desc = curItemData?.desc;
  }
}
