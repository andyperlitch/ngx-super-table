import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SuperTableComponent } from './components/super-table.component';
import { SuperTableHeadComponent } from './components/super-table-head.component';
import { SuperTableBodyComponent } from './components/super-table-body.component';
import { SuperTableRowComponent } from './components/super-table-row.component';
import { DummyRowsComponent } from './components/dummy-rows.component';
import { TableHeaderComponent, ResizerComponent } from './components/table-header.component';
import { SuperTableCellComponent } from './components/super-table-cell.component';
import { TableCellComponent } from './components/table-cell.component';
import { TextFilterComponent } from './components/text-filter.component';
import { EnumFilterComponent, EnumFilterDropdownComponent } from './components/enum-filter.component';

@NgModule({
  // Components declared in this library
  declarations: [
    SuperTableComponent,
    SuperTableHeadComponent,
    SuperTableBodyComponent,
    SuperTableCellComponent,
    SuperTableRowComponent,
    DummyRowsComponent,
    TableHeaderComponent,
    TableCellComponent,
    ResizerComponent,
    TextFilterComponent,
    EnumFilterComponent,
    EnumFilterDropdownComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    SuperTableComponent,
    SuperTableCellComponent
  ],
  entryComponents: [
    EnumFilterDropdownComponent
  ]
})
export class SuperTableModule {
  public static forRoot(): ModuleWithProviders {
    return {
      ngModule: SuperTableModule,
      providers: []
    };
  }
}
