import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { ISuperTableFilter } from './superTableFilters';
import { ColumnState } from './SuperTableState';
import {Observable} from 'rxjs/Observable';
import * as _ from 'lodash';
import { SuperTableState } from './SuperTableState';

@Component({
  selector: '[text-filter]',
  template: `
    <input type="text" [(ngModel)]="column.filterValue" (ngModelChange)="onModelChange($event)" [attr.placeholder]="filter.placeholder" />
  `
})
export class TextFilter {
  @Input() filter: ISuperTableFilter;
  @Input() column: ColumnState;

  onModelChange: Function = _.debounce(function(searchTerm : string) {
    this.state.setColumnTextFilter(this.column, searchTerm);
  }, 200);

  constructor(private state : SuperTableState) {}


}
