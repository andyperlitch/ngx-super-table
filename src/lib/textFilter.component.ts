import { Component, Input, Output, ElementRef, EventEmitter } from '@angular/core';
import { ISuperTableFilter, ColumnState } from './interfaces';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { SuperTableState } from './SuperTableState';

@Component({
  selector: '[text-filter]',
  template: `
    <input
      class="form-control input-sm"
      type="text"
      [(ngModel)]="column.filterValue"
      (ngModelChange)="onModelChange($event)"
      [attr.placeholder]="filter.placeholder"
      [attr.title]="filter.title"
      [ngClass]="{ hasContent: !!column.filterValue }" />

    <button *ngIf="column.filterValue" class="clear-btn" role="button" (click)="clearFilter($event)">&times;</button>
  `,
  styles: [`
    :host {
      position: relative;
    }
    input {
      width: 100%;
      font-size: 90%;
      border: none;
      border-radius: 0;
    }
    .hasContent {
      background: #dff7ff;
    }
    .clear-btn {
      position: absolute;
      background: transparent;
      color: black;
      right: 0;
      top: 0;
      border: none;
      font-size: 120%;
    }
  `]
})
export class TextFilter {
  @Input() filter: ISuperTableFilter;
  @Input() column: ColumnState;

  onModelChange: Function = _.debounce(function() : void {
    this.state.notify();
  }, 200);

  public clearFilter () : void {
    this.column.filterValue = '';
    this.state.notify();
  }

  constructor(private state : SuperTableState) {}


}
