import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { ColumnState } from './interfaces';
import { SuperTableState } from './super-table-state';

@Component({
  /* tslint:disable-next-line */
  selector: '[super-table-resizer]',
  template: `<div class="notch" [ngClass]="{ explicit: column.width }"></div>`,
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
      background-color: rgba(22, 140, 239, 0.2);
    }
    .notch {
      width: 100%;
      height: 50%;
      transform: translateY(50%);
      box-shadow: inset 1px 0 #DDD;
    }
  `]
})
export class ResizerComponent {

  private static MAX_CLICK_WAIT = 250;
  private static MIN_COLUMN_WIDTH = 30;

  @Input() column: ColumnState;
  @Input() actualWidth: number;

  constructor (private el: ElementRef) { }

  @HostBinding('attr.title')
  get title(): string {
    return 'Click-and-drag to resize. Click to clear specified width.';
  }

  @HostListener('mousedown', ['$event'])
  grab(grabEvt: MouseEvent): void {
    grabEvt.preventDefault();
    const mousedownTime: number = Date.now();
    const initClientX: number = grabEvt.clientX;
    const initWidth: number = this.column.width || this.getActualParentWidth();
    const drag: EventListener = (event: MouseEvent) => {
      const change: number = event.clientX - initClientX;
      this.column.width = Math.max(initWidth + change, ResizerComponent.MIN_COLUMN_WIDTH);
    };
    const unbindDrag: EventListener = () => {
      window.removeEventListener('mousemove', drag);
      window.removeEventListener('mouseup', unbindDrag);
      if (Date.now() - mousedownTime < ResizerComponent.MAX_CLICK_WAIT) {
        this.column.width = null;
      }
    };
    window.addEventListener('mousemove', drag);
    window.addEventListener('mouseup', unbindDrag);
  }

  @HostListener('click', ['$event'])
  stopClick(event: MouseEvent): void {
    event.preventDefault();
    event.stopPropagation();
  }

  private getActualParentWidth(): number {
    return this.el.nativeElement.parentElement.offsetWidth;
  }

}

@Component({
  /* tslint:disable-next-line */
  selector: '[super-table-header]',
  template: `
    <div *ngIf="!noHeight" class="table-header-div" [title]="SORT_TITLE">
      <span *ngIf="column.def.sort" class="sort-icon">
        <span [ngSwitch]="column.sortOrder">
          <span class="asc-sort glyphicon glyphicon-sort-by-attributes" *ngSwitchCase="'ASC'"></span>
          <span class="desc-sort glyphicon glyphicon-sort-by-attributes-alt" *ngSwitchCase="'DESC'"></span>
          <span class="no-sort glyphicon glyphicon-sort" *ngSwitchDefault></span>
        </span>
      </span>
      {{ getValue() }}
    </div>
    <div *ngIf="!noHeight && !column.def.lockWidth" super-table-resizer [column]="column"></div>
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
  `]
})
export class TableHeaderComponent {
  @Input() column: ColumnState;
  @Input() noHeight = false;

  SORT_TITLE = 'Click to change sort order. Shift-click to sort on multiple columns.';

  constructor(private el: ElementRef, private state: SuperTableState) { }

  getValue(): string {
    return this.column.def.label;
  }

  @HostBinding('style.width')
  get width(): string {
    return (typeof this.column.width === 'number') ? this.column.width + 'px' : 'auto';
  }

  @HostListener('click', ['$event'])
  handleClick(event: MouseEvent): void {
    event.preventDefault();
    if (this.column.hasSort) {
      this.state.toggleSort(this.column, event.shiftKey);
    }
  }
}
