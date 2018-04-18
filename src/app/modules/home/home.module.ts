import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SuperTableModule } from 'ngx-super-table';

import { HomeComponent } from './home.component';
import { InstrumentComponent } from './instrument.component';
import { DemoComponent } from './demo.component';

@NgModule({
  declarations: [
    HomeComponent,
    DemoComponent,
    InstrumentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    SuperTableModule.forRoot()
  ],
  exports: [],
  entryComponents: [InstrumentComponent]
})
export class HomeModule { }
