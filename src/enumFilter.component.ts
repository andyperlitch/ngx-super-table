import { Component, Input } from '@angular/core';
import { ISuperTableFilter, ColumnState } from './interfaces';

@Component({
  selector: '[enum-filter]',
  template: `
    <span>WIP</span>
  `
})
export class EnumFilter {
  @Input() filter: ISuperTableFilter;
  @Input() column: ColumnState;
}
