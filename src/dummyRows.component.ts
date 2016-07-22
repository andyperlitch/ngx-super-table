import { Component, Input, OnChanges } from '@angular/core';

const BG_IMAGE_DATA = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAlCAYAAACDKIOpAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiuHv37n+G////MzAxAMHQIQACDAC7twbaN2nkgwAAAABJRU5ErkJggg==';

@Component({
  selector: '[dummy-rows]',
  template: `
    <tr [style.height]="(rowHeight * rowCount) + 'px'">
      <td [attr.colspan]="columnCount" [style.backgroundSize]="'auto ' + rowHeight + 'px'"></td>
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
