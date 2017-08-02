import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { ISuperTableColumn, ColumnState, ISuperTableOptions } from './interfaces';
import { SuperTableState } from './super-table-state';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'super-table',
  template: `
    <super-table-head [tableClasses]="tableClasses"></super-table-head>

    <super-table-body
      *ngIf="isReady"
      [rows]="filteredSortedRows"
      [tableClasses]="tableClasses"
      [options]="options"
      [style.height]="bodyHeight + 'px'"
      [bodyHeight]="bodyHeight">
    </super-table-body>

    <div
      class="loading-message"
      *ngIf="!isReady && !hasError">
      Loading...
    </div>

    <div *ngIf="hasError">An error occurred.</div>
  `,
  styles: [`
    :host {
      position: relative;
      display: block;
    }
    .loading-message {
      text-align: center;
    }
  `],
  providers: [SuperTableState]
})
export class SuperTableComponent implements OnInit, AfterContentInit, OnChanges, OnDestroy {

  // inputs
  @Input() rows: Array<any>;
  @Input() columns: Array<ISuperTableColumn>;
  @Input() options: ISuperTableOptions;
  @Input() tableClasses: any;

  // properties
  isReady = false;
  hasError = false;
  bodyHeight: number;
  filteredSortedRows: Array<any>;
  private subscription: Subscription;

  constructor (private el: ElementRef, private state: SuperTableState) {}

  ngOnInit(): void {
    this.subscription = this.state.stateChanged$.subscribe(() => this.sortAndFilterRows());
  }

  ngAfterContentInit(): void {
    if (this.options.autoHeight) {
      const parentHeight: number = this.el.nativeElement.parentElement.clientHeight;
      this.setTableHeight(parentHeight);
    }
    this.isReady = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    // Inform state of columns changes
    if (changes['columns'] && changes['columns'].isFirstChange()) {
      this.state.setColumns(changes['columns'].currentValue);
    }
    this.sortAndFilterRows();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private setTableHeight(totalHeight: number): void {
    // calculate header height
    const headerHeight: number = this.el.nativeElement.querySelector('super-table-head').offsetHeight;
    // subtract it from totalHeight, set bodyHeight to result
    this.bodyHeight = totalHeight - headerHeight;
  }

  private sortAndFilterRows(): void {
    // Filtering
    const activeFilterColumns: ColumnState[] = this.state.columns.filter((c) => {
      return !!c.def.filter && !!c.def.filter.isActive(c.filterValue);
    });

    if (activeFilterColumns.length) {
      this.filteredSortedRows = this.rows.filter((row) => {
        for (let i = 0; i < activeFilterColumns.length; i++) {
          const colState: ColumnState = activeFilterColumns[i];
          const val: any = row[colState.def.key];
          const filterResult: boolean = colState.def.filter.fn(colState.filterValue, val, row);
          if (filterResult === false) {
            return false;
          }
        }
        return true;
      });
    } else {
      this.filteredSortedRows = this.rows.slice();
    }

    // Sorting
    this.filteredSortedRows.sort( (a, b) => {
      for (let i = 0; i < this.state.sortStack.length; i++) {
        const colState: ColumnState = this.state.sortStack[i];
        const val1 = a[colState.def.key];
        const val2 = b[colState.def.key];
        const compareResult: number = colState.sortOrder === 'ASC'
          ? colState.def.sort(val1, val2, a, b)
          : colState.def.sort(val2, val1, b, a);
        if (compareResult !== 0) {
          return compareResult;
        }
      }
      return 0;
    });
  }
}
