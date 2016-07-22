import { Component, Input } from '@angular/core';
import { SuperTableState } from './SuperTableState';
import { TableCell } from './tableCell.component';

@Component({
  selector: '[super-table-row]',
  template: `<td *ngFor="let column of state.columns" table-cell [row]="row" [column]="column"></td>`,
  directives: [TableCell]
})
export class SuperTableRow {
  @Input() row: any;
  @Input() state : SuperTableState;
}
