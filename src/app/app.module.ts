import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { SuperTableModule } from '../lib';

import { AppComponent } from './app.component';
import { DemoComponent } from './demo.component';
import { InstrumentComponent } from './instrument.component';

@NgModule({
  declarations: [
    AppComponent,
    DemoComponent,
    InstrumentComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    SuperTableModule
  ],
  entryComponents: [InstrumentComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
