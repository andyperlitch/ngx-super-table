import { Component, Input } from '@angular/core';
import { SuperTableState } from './super-table-state';

@Component({
  selector: 'super-table-head',
  template: `
    <table [ngClass]="tableClasses">
      <thead>
        <tr>
          <th
            *ngFor="let column of state.columns"
            super-table-header
            scope="col"
            [column]="column"
            [ngClass]="{ hasSort: column.hasSort }"></th>
        </tr>
        <tr *ngIf="state.hasAnyFilters" class="filter-row">
          <td *ngFor="let column of state.columns">
            <div *ngIf="column.hasFilter" [ngSwitch]="column.def.filter.type">
              <div *ngSwitchCase="'TEXT'" super-table-text-filter [filter]="column.def.filter" [column]="column"></div>
              <div *ngSwitchCase="'ENUM'" super-table-enum-filter [filter]="column.def.filter" [column]="column"></div>
            </div>
          </td>
        </tr>
      </thead>
    </table>
  `,
  styles: [`
    :host {
      overflow-y: scroll;
      display: block;
    }
    .hasSort {
      cursor: pointer;
    }
    table {
      table-layout: fixed;
      width: 100%;
      margin-bottom: 0;
      border-bottom: none;
    }
    .filter-row td {
      padding: 0;
      vertical-align: middle;
    }
  `]
})
export class SuperTableHeadComponent {
  @Input() tableClasses: any;

  constructor(public state: SuperTableState) {}
}
