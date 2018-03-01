import { Component, Input } from '@angular/core';

import { ColumnState } from '../models/interfaces';

@Component({
  selector: 'super-table-cell',
  template: ``
})
export class SuperTableCellComponent {

  @Input() row: Object;
  @Input() column: ColumnState;
  @Input() key: string;
  @Input() value: any;

}
