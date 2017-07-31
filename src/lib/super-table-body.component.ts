import {
 Component,
 ElementRef,
 HostListener,
 Input,
 OnChanges,
 SimpleChanges
} from '@angular/core';
import { SuperTableState } from './super-table-state';
import { ISuperTableOptions } from './interfaces';
import { debounce } from 'lodash';

const DEFAULT_ROW_HEIGHT = 20;
const PADDING_ROW_COUNT = 20;
const DEBOUNCE_DELAY = 250;

@Component({
  selector: 'super-table-body',
  template: `
    <table [ngClass]="tableClasses">
      <thead class="sizing-thead">
        <tr>
          <th scope="col" *ngFor="let column of state.columns" super-table-header [column]="column" [noHeight]="true"></th>
        </tr>
      </thead>
      <tbody
        class="dummy-rows"
        super-table-dummy-rows
        [columnCount]="state.columns.length"
        [rowHeight]="rowHeight"
        [rowCount]="rowOffset">
      </tbody>
      <tbody class="visible-rows">
        <tr *ngFor="let row of visibleRows" super-table-row [row]="row"></tr>
      </tbody>
      <tbody
        class="dummy-rows"
        super-table-dummy-rows
        [columnCount]="state.columns.length"
        [rowHeight]="rowHeight"
        [rowCount]="rows.length - rowOffset - visibleRows.length - 1">
      </tbody>
    </table>
  `,
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
export class SuperTableBodyComponent implements OnChanges {
  @Input() rows: Array<any>;
  @Input() tableClasses: any;
  @Input() bodyHeight: number;
  @Input() options: ISuperTableOptions;

  visibleRows: Array<any> = [];

  // assume small row height at first.
  // The real height will be detected once rows are rendered.
  rowHeight: number = DEFAULT_ROW_HEIGHT;
  rowOffset = 0;

  private scrollHandler = debounce(() => {
    this.updateVisibleRows();
  }, DEBOUNCE_DELAY);

  private resizeHandler = debounce(() => {
    this.detectRowHeight();
    this.updateVisibleRows();
  });

  constructor (private el: ElementRef, public state: SuperTableState) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.updateVisibleRows();
  }

  @HostListener('scroll')
  trackScroll() {
    this.scrollHandler();
  }

  @HostListener('resize')
  onWindowResize() {
    this.resizeHandler();
  }

  private updateVisibleRows(): void {
    let startIndex: number, endIndex: number;
    const currentScroll: number = this.el.nativeElement.scrollTop;

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

  private detectRowHeight(): void {
    const tr: HTMLTableSectionElement = this.el.nativeElement.querySelector('tbody.visible-rows tr');
    if (tr != null) {
      this.rowHeight = tr.offsetHeight;
    }
  }
}
