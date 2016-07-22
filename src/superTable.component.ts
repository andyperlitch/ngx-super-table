import { Component, Input, AfterViewInit, AfterContentInit, ElementRef } from '@angular/core';
import { ISuperTableColumn } from './ISuperTableColumn';
import { ISuperTableOptions } from './ISuperTableOptions';
import { SuperTableHead } from './superTableHead.component';
import { SuperTableBody } from './superTableBody.component';

@Component({
  selector: 'super-table',
  template: `
    <super-table-head [columns]="columns" [tableClasses]="tableClasses"></super-table-head>

    <super-table-body
      *ngIf="isReady"
      [columns]="columns"
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
export class SuperTable implements AfterContentInit {

  // inputs
  @Input() rows: Array<any>;
  @Input() columns: Array<ISuperTableColumn>;
  @Input() options: ISuperTableOptions;
  @Input() tableClasses: any;

  // properties
  private isReady = false;
  private hasError = false;
  private bodyHeight: number;

  constructor (private el:ElementRef) {}

  ngAfterContentInit () {
    if (this.options.autoHeight) {
      let parentHeight:number = this.el.nativeElement.parentElement.clientHeight;
      this.setTableHeight(parentHeight);
    }
    this.isReady = true;
  }

  private setTableHeight (totalHeight: number) {
    // calculate header height
    let headerHeight = this.el.nativeElement.querySelector('super-table-head').offsetHeight;
    // subtract it from totalHeight, set bodyHeight to result
    this.bodyHeight = totalHeight - headerHeight;
  }

}
