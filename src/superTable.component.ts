import { Component, Input, AfterViewInit, AfterContentInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';
import { ISuperTableOptions } from './ISuperTableOptions';
import { SuperTableHead } from './superTableHead.component';
import { SuperTableBody } from './superTableBody.component';
import { SuperTableState } from './SuperTableState';

@Component({
  selector: 'super-table',
  template: `
    <super-table-head [state]="state" [tableClasses]="tableClasses"></super-table-head>

    <super-table-body
      *ngIf="isReady"
      [state]="state"
      [rows]="rows"
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
  `]
})
export class SuperTable implements AfterContentInit, OnChanges {

  // inputs
  @Input() rows: Array<any>;
  @Input() columns: Array<ISuperTableColumn>;
  @Input() options: ISuperTableOptions;
  @Input() tableClasses: any;

  // properties
  private isReady : boolean = false;
  private hasError : boolean = false;
  private bodyHeight : number;
  private state : SuperTableState = new SuperTableState();

  constructor (private el: ElementRef) {}

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
  }

  private setTableHeight (totalHeight: number) : void {
    // calculate header height
    let headerHeight : number = this.el.nativeElement.querySelector('super-table-head').offsetHeight;
    // subtract it from totalHeight, set bodyHeight to result
    this.bodyHeight = totalHeight - headerHeight;
  }

}
