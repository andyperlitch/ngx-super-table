import { Component, Input } from '@angular/core';
import { ColumnState } from './SuperTableState';

@Component({
  selector: '[table-header]',
  host: {
    '[style.width]': 'getWidth()'
  },
  template: `
    <span *ngIf="!noHeight">
      <span>{{ getValue() }}</span>
    </span>
  `
})
export class TableHeader {
  @Input() column : ColumnState;
  @Input() noHeight : boolean = false;

  private getWidth() : string {
    return (typeof this.column.width === 'number') ? this.column.width + 'px' : 'auto';
  }

  private getValue() : string {
    return this.column.def.label;
  }
}
