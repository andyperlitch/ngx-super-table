import { Component, Input } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';
import { SuperTableCell } from './superTableCell.component';

@Component({
  selector: '[super-table-row]',
  template: `<td *ngFor="let column of columns" super-table-cell [row]="row" [column]="column"></td>`,
  directives: [SuperTableCell]
})
export class SuperTableRow {
  @Input() row: any;
  @Input() columns: Array<ISuperTableColumn>;
}
