import { Component, AfterViewInit } from '@angular/core';
import { SuperTableCell } from '../lib';

@Component({
  selector: 'app-instrument-cell',
  template: `<span class="badge badge-primary">{{ value }}</span>`
})
export class InstrumentComponent extends SuperTableCell {
  value: any;
}
