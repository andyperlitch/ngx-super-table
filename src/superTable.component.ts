import {
  Component,
  Input,
  OnInit,
  AfterViewInit,
  AfterContentInit,
  ElementRef,
  OnChanges,
  SimpleChanges,
  OnDestroy
} from '@angular/core';
import { ISuperTableColumn, ColumnState, ISuperTableOptions } from './interfaces';
import { SuperTableHead } from './superTableHead.component';
import { SuperTableBody } from './superTableBody.component';
import { SuperTableState } from './SuperTableState';
import { Subscription }   from 'rxjs/Subscription';

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
  directives: [SuperTableHead, SuperTableBody],
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
export class SuperTable implements AfterContentInit, OnChanges, OnDestroy, OnInit {

  // inputs
  @Input() rows: Array<any>;
  @Input() columns: Array<ISuperTableColumn>;
  @Input() options: ISuperTableOptions;
  @Input() tableClasses: any;

  // properties
  private isReady : boolean = false;
  private hasError : boolean = false;
  private bodyHeight : number;
  private filteredSortedRows : Array<any>;
  private subscription : Subscription;

  constructor (private el: ElementRef, private state: SuperTableState) {}

  ngOnInit () : void {
    this.subscription = this.state.stateChanged$.subscribe(() => this.sortAndFilterRows());
  }

  ngAfterContentInit () : void {
    if (this.options.autoHeight) {
      let parentHeight : number = this.el.nativeElement.parentElement.clientHeight;
      this.setTableHeight(parentHeight);
    }
    this.isReady = true;
  }

  ngOnChanges (changes: SimpleChanges) : void {
    // Inform state of columns changes
    if (changes['columns'].isFirstChange()) {
      this.state.setColumns(changes['columns'].currentValue);
    }
    this.sortAndFilterRows();
  }

  ngOnDestroy () : void {
    this.subscription.unsubscribe();
  }

  private setTableHeight (totalHeight: number) : void {
    // calculate header height
    let headerHeight : number = this.el.nativeElement.querySelector('super-table-head').offsetHeight;
    // subtract it from totalHeight, set bodyHeight to result
    this.bodyHeight = totalHeight - headerHeight;
  }

  private sortAndFilterRows () : void {
    // Filtering
    let activeFilterColumns : ColumnState[] = this.state.columns.filter((c) => {
      return !! c.filterValue && !!c.def.filter;
    });

    if ( activeFilterColumns.length ){
      this.filteredSortedRows = this.rows.filter((row) => {
        for (let i = 0; i < activeFilterColumns.length; i++) {
          let colState : ColumnState = activeFilterColumns[i];
          let val : any = row[colState.def.key];
          let filterResult : boolean = colState.def.filter.fn(colState.filterValue, val, row);
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
    this.filteredSortedRows.sort( (a,b) => {
      for (let i = 0; i < this.state.sortStack.length; i++) {
        let colState : ColumnState = this.state.sortStack[i];
        let val1 = a[colState.def.key];
        let val2 = b[colState.def.key];
        let compareResult : number = colState.sortOrder === 'ASC'
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
