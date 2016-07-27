import { Component, Input } from '@angular/core';
import { ISuperTableFilter } from './superTableFilters';
import { ColumnState } from './SuperTableState';

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
