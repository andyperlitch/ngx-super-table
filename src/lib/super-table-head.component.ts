import { Component, Input } from '@angular/core';
import { SuperTableState } from './super-table-state';

@Component({
  selector: 'super-table-head',
  template: `
    <div class="super-table-head">
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
    </div>
  `,
  styleUrls: ['./super-table-head.component.css']
})
export class SuperTableHeadComponent {
  @Input() tableClasses: any;

  constructor(public state: SuperTableState) {}
}
