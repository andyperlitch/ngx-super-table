import { Component, AfterViewInit } from '@angular/core';
import { SuperTableCellComponent } from '../lib';

@Component({
  selector: 'app-instrument-cell',
  template: `<span class="badge badge-primary">{{ value }}</span>`
})
export class InstrumentComponent extends SuperTableCellComponent {
  value: any;
}
