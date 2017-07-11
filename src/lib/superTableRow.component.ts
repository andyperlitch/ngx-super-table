import { Component, Input } from '@angular/core';
import { SuperTableState } from './SuperTableState';

@Component({
  selector: '[super-table-row]',
  template: `<td *ngFor="let column of state.columns" table-cell [row]="row" [column]="column"></td>`
})
export class SuperTableRow {
  @Input() row: any;
  constructor(private state: SuperTableState) {}
}
