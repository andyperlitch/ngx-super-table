import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SuperTableModule} from '../src';
import {Demo, InstrumentComponent} from './demo.component';

@NgModule({
  declarations: [Demo, InstrumentComponent],
  imports: [BrowserModule, SuperTableModule],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}
