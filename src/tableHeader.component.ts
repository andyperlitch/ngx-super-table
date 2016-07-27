import { Component, Input, ElementRef, HostBinding } from '@angular/core';
import { ColumnState } from './SuperTableState';
import { SuperTableState } from './SuperTableState';

const SORT_TITLE = 'Click to change sort order. Shift-click to sort on multiple columns.';

@Component({
  selector: '[resizer]',
  template: `<div class="notch" [ngClass]="{ explicit: column.width }"></div>`,
  host: {
    '(mousedown)': 'grab($event)',
    '[attr.title]': '"Click-and-drag to resize. Click to clear specified width."'
  },
  styles: [`
    :host {
      position: absolute;
      right: 0;
      top: 0;
      width: 5px;
      height: 100%;
      cursor: col-resize;
    }
    .notch.explicit {
      background-color: #e6e6e6;
    }
    .notch {
      width: 100%;
      height: 50%;
      transform: translateY(50%);
      box-shadow: inset 1px 0 #DDD;
    }
  `]
})
class Resizer {
  @Input() column: ColumnState;
  @Input() actualWidth: number;

  private static MAX_CLICK_WAIT : number = 250;
  private static MIN_COLUMN_WIDTH : number = 30;

  constructor (private el: ElementRef) {}

  private grab (grabEvt: MouseEvent) : void {
    grabEvt.preventDefault();
    let mousedownTime : number = Date.now();
    let initClientX : number = grabEvt.clientX;
    let initWidth : number = this.column.width || this.getActualParentWidth();
    let drag : EventListener = (event : MouseEvent) => {
      let change : number = event.clientX - initClientX;
      this.column.width = Math.max(initWidth + change, Resizer.MIN_COLUMN_WIDTH);
    };
    let unbindDrag : EventListener = () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', unbindDrag);
      if (Date.now() - mousedownTime < Resizer.MAX_CLICK_WAIT) {
        this.column.width = null;
      }
    };
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', unbindDrag);
  }

  private getActualParentWidth () : number {
    return this.el.nativeElement.parentElement.offsetWidth;
  }
}

@Component({
  selector: '[table-header]',
  host: {
    '[style.width]': 'getWidth()',
    '(click)': 'handleClick($event)'
  },
  template: `
    <div *ngIf="!noHeight" class="table-header-div" title="${SORT_TITLE}">
      <span *ngIf="column.def.sort" class="sort-icon">
        <span [ngSwitch]="column.sortOrder">
          <span class="asc-sort glyphicon glyphicon-sort-by-attributes" *ngSwitchCase="'ASC'"></span>
          <span class="desc-sort glyphicon glyphicon-sort-by-attributes-alt" *ngSwitchCase="'DESC'"></span>
          <span class="no-sort glyphicon glyphicon-sort" *ngSwitchDefault></span>
        </span>
      </span>
      {{ getValue() }}
    </div>
    <div *ngIf="!noHeight && !column.def.lockWidth" resizer [column]="column"></div>
  `,
  styles: [`
    :host {
      position:relative;
      -webkit-touch-callout: none;
      -webkit-user-select: none;
      -khtml-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
      user-select: none;
    }
    :host:hover .sort-icon {
      opacity: 1;
    }
    .table-header-div {
      position: relative;
    }
    .sort-icon {
      font-size: 70%;
      opacity: 1;
      color: #168cef;
      text-shadow: 0 1px 2px rgba(22, 140, 239, 0.6);
    }
    .sort-icon .no-sort {
      opacity: 0.3;
      text-shadow: none;
      color: black;
    }
  `],
  directives: [Resizer]
})
export class TableHeader {
  @Input() column : ColumnState;
  @Input() noHeight : boolean = false;

  constructor(private el: ElementRef, private state: SuperTableState) {}

  private getWidth() : string {
    return (typeof this.column.width === 'number') ? this.column.width + 'px' : 'auto';
  }

  private getValue() : string {
    return this.column.def.label;
  }

  private handleClick( event : MouseEvent ) : void {
    event.preventDefault();
    if (this.column.hasSort) {
      this.state.toggleSort(this.column, event.shiftKey);
    }
  }
}
