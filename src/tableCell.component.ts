import { Component, Input } from '@angular/core';
import { ColumnState } from './SuperTableState';

@Component({
  selector: '[table-cell]',
  template: `{{ getValue() }}`
})
export class TableCell {
  @Input() row: any;
  @Input() column: ColumnState;
  getValue () : any {
    return this.row[this.column.def.key];
  }
}
