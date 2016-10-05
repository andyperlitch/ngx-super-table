import { Component, OnDestroy } from '@angular/core';
import { SuperTableCell } from '../src';

@Component({
  selector: 'instrument-cell',
  template: `<span class="label label-primary">{{ value }}</span>`
})
export class InstrumentComponent extends SuperTableCell {}
