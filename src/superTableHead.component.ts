import { Component, Input } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';

@Component({
  selector: 'super-table-head',
  template: `
    <table [ngClass]="tableClasses">
      <thead>
        <tr>
          <th scope="col" *ngFor="let column of columns" title="{{ column.title }}">
            {{ column.label }}
          </th>
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
  @Input() columns: Array<ISuperTableColumn>;
  @Input() tableClasses: any;
}
