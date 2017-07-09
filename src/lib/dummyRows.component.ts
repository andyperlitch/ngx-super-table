import { Component, Input, OnChanges } from '@angular/core';
const BG_IMAGE_DATA: string = [
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAlCAYAAACDKIOp',
  'AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiuH',
  'v37n+G////MzAxAMHQIQACDAC7twbaN2nkgwAAAABJRU5ErkJggg=='].join('');

@Component({
  selector: '[dummy-rows]',
  template: `
    <tr [style.height]="(rowHeight * rowCount) + 'px'">
      <td
        [attr.colspan]="columnCount"
        [style.backgroundSize]="'auto ' + rowHeight + 'px'">
      </td>
    </tr>
  `,
  styles: [`
    :host {
      border: none !important;
    }
    td {
      padding: 0 !important;
      border: none !important;
      background-image: url('${BG_IMAGE_DATA}');
      background-repeat: repeat;
      background-position: 0 -1px;
    }

  `]
})
export class DummyRows {
  @Input() rowHeight: number;
  @Input() rowCount: number;
  @Input() columnCount: number;
}
