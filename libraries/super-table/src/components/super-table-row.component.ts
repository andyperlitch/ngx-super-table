import { Component, Input } from '@angular/core';
import { SuperTableState } from '../services/super-table-state.service';

@Component({
  /* tslint:disable-next-line */
  selector: '[super-table-row]',
  template: `<td *ngFor="let column of state.columns" super-table-cell [row]="row" [column]="column"></td>`
})
export class SuperTableRowComponent {

  @Input() row: any;

  constructor(public state: SuperTableState) { }

}
