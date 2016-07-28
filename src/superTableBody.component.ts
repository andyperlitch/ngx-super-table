import { Component, Input, ElementRef, SimpleChanges, OnChanges, OnInit, OnDestroy } from '@angular/core';
import { SuperTableState } from './SuperTableState';
import { SuperTableRow } from './superTableRow.component';
import { TableHeader } from './tableHeader.component';
import { DummyRows } from './dummyRows.component';
import * as _ from 'lodash';

const DEFAULT_ROW_HEIGHT : number = 20;
const PADDING_ROW_COUNT : number = 20;
const DEBOUNCE_DELAY : number = 250;

@Component({
  selector: 'super-table-body',
  template: `
    <table [ngClass]="tableClasses">
      <thead class="sizing-thead">
        <tr>
          <th scope="col" *ngFor="let column of state.columns" table-header [column]="column" [noHeight]="true"></th>
        </tr>
      </thead>
      <tbody
        class="dummy-rows"
        dummy-rows
        [columnCount]="state.columns.length"
        [rowHeight]="rowHeight"
        [rowCount]="rowOffset">
      </tbody>
      <tbody class="visible-rows">
        <tr *ngFor="let row of visibleRows" super-table-row [row]="row"></tr>
      </tbody>
      <tbody
        class="dummy-rows"
        dummy-rows
        [columnCount]="state.columns.length"
        [rowHeight]="rowHeight"
        [rowCount]="rows.length - rowOffset - visibleRows.length - 1">
      </tbody>
    </table>
  `,
  host: {
    '(scroll)': 'trackScroll($event)'
  },
  directives: [SuperTableRow, DummyRows, TableHeader],
  styles: [`
    :host {
      display: block;
      overflow: auto;
    }
    table {
      table-layout: fixed;
      width: 100%;
      margin-bottom: 0;
    }
    thead.sizing-thead th {
      padding: 0 !important;
      border-width: 0;
    }
    tbody.dummy-rows, tbody.visible-rows {
      border-top: none;
    }
  `]
})
export class SuperTableBody implements OnChanges, OnInit, OnDestroy {
  @Input() rows : Array<any>;
  @Input() tableClasses : any;
  @Input() bodyHeight : number;

  private visibleRows : Array<any> = [];

  // assume small row height at first.
  // The real height will be detected once rows are rendered.
  private rowHeight : number = DEFAULT_ROW_HEIGHT;
  private rowOffset : number = 0;
  private trackScroll : Function = _.debounce( () => {
    this.updateVisibleRows();
  }, DEBOUNCE_DELAY);
  private onWindowResize : EventListener = _.debounce( () => {
    this.detectRowHeight();
    this.updateVisibleRows();
  });

  constructor (private el: ElementRef, private state: SuperTableState) {}

  ngOnInit () : void {
    window.addEventListener('resize', this.onWindowResize);
  }

  ngOnDestroy () : void {
    window.removeEventListener('resize', this.onWindowResize);
  }

  ngOnChanges (changes: SimpleChanges) : void {
    this.updateVisibleRows();
  }

  private updateVisibleRows () : void {
    let startIndex : number, endIndex : number;
    let currentScroll : number = this.el.nativeElement.scrollTop;

    startIndex = Math.floor(currentScroll / this.rowHeight - PADDING_ROW_COUNT);
    startIndex = Math.max(0, startIndex);
    this.rowOffset = startIndex;

    endIndex = Math.ceil((currentScroll + this.bodyHeight) / this.rowHeight + PADDING_ROW_COUNT);
    endIndex = Math.min(this.rows.length - 1, endIndex);
    this.visibleRows = this.rows.slice(startIndex, endIndex);
    setTimeout( () => {
      this.detectRowHeight();
    });

  }

  private detectRowHeight () : void {
    let tr : HTMLTableSectionElement = this.el.nativeElement.querySelector('tbody.visible-rows tr');
    if (tr != null) {
      this.rowHeight = tr.offsetHeight;
    }
  }
}
