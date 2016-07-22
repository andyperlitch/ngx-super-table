import { Component, Input } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';

@Component({
  selector: '[super-table-cell]',
  template: `{{ getValue() }}`
})
export class SuperTableCell {
  @Input() row: any;
  @Input() column: ISuperTableColumn;
  getValue() {
    return this.row[this.column.key];
  }
}
