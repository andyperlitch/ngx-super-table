import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperTableComponent } from './super-table.component';
import { SuperTableHeadComponent } from './super-table-head.component';
import { SuperTableBodyComponent } from './super-table-body.component';
import { SuperTableRowComponent } from './super-table-row.component';
import { DummyRowsComponent } from './dummy-rows.component';
import { TableHeaderComponent, ResizerComponent } from './table-header.component';
import { SuperTableCellComponent } from './super-table-cell.component';
import { TableCellComponent } from './table-cell.component';
import { TextFilterComponent } from './text-filter.component';
import { EnumFilterComponent, EnumFilterDropdownComponent } from './enum-filter.component';

export * from './interfaces';
export { superTableSorters } from './super-table-sorters';
export { superTableFilters } from './super-table-filters';
export { SuperTableCellComponent } from './super-table-cell.component';

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
  imports: [CommonModule, FormsModule],
  exports: [
    SuperTableComponent,
    SuperTableCellComponent
  ],
  entryComponents: [
    EnumFilterDropdownComponent
  ]
})
export class SuperTableModule { }
