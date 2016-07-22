import { Component, Input, ElementRef, OnChanges } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';
import { SuperTableRow } from './superTableRow.component';

@Component({
  selector: 'super-table-body',
  template: `
    <table [ngClass]="tableClasses">
      <thead class="sizing-thead">
        <tr>
          <th scope="col" *ngFor="let column of columns"></th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let row of rows" super-table-row [row]="row" [columns]="columns"></tr>
      </tbody>
    </table>
  `,
  directives: [SuperTableRow],
  styles: [`
    :host {
      display: block;
      overflow: auto;
    }
    table {
      table-layout: fixed;
      width: 100%;
      margin-bottom: 0;
    }
    thead.sizing-thead th {
      padding: 0 !important;
      border-width: 0;
    }
  `]
})
export class SuperTableBody {
  @Input() rows: Array<any>;
  @Input() columns: Array<ISuperTableColumn>;
  @Input() tableClasses: any;
}
