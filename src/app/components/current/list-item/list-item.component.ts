import { Component, Input } from '@angular/core';
import { ItemData } from 'src/app/types/itemData';

@Component({
  selector: 'wa-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.scss'],
})
export class ListItemComponent {
  @Input() itemData: ItemData;
}
