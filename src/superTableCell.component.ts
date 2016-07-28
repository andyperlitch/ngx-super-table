import { Component, Input } from '@angular/core';
import { ColumnState } from './SuperTableState';

@Component({
  template: ``
})
export class SuperTableCell {
  @Input() row: Object;
  @Input() column: ColumnState;
  @Input() key: string;
  @Input() value: any;
}
