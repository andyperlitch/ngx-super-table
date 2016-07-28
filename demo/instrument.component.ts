import { Component, OnDestroy } from '@angular/core';
import { SuperTableCell } from '../ng2-super-table';

@Component({
  selector: 'instrument-cell',
  template: `<span class="label label-primary">{{ value }}</span>`
})
export class InstrumentComponent extends SuperTableCell {}
