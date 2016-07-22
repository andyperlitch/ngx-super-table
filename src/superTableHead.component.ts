import { Component, Input } from '@angular/core';
import { SuperTableState } from './SuperTableState';
import { TableHeader } from './tableHeader.component';

@Component({
  selector: 'super-table-head',
  directives: [TableHeader],
  template: `
    <table [ngClass]="tableClasses">
      <thead>
        <tr>
          <th scope="col" *ngFor="let column of state.columns" table-header [column]="column"></th>
        </tr>
      </thead>
    </table>
  `,
  styles: [`
    :host {
      overflow-y: scroll;
      display: block;
    }
    table {
      table-layout: fixed;
      width: 100%;
      margin-bottom: 0;
      border-bottom: none;
    }
  `]
})
export class SuperTableHead {
  @Input() state : SuperTableState;
  @Input() tableClasses : any;
}
