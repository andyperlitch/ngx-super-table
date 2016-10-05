import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {SuperTableModule} from '../src';
import {Demo} from './demo.component';

@NgModule({
  declarations: [Demo],
  imports: [BrowserModule, SuperTableModule],
  bootstrap: [Demo],
  providers: []
})
export class DemoModule {}
