import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SuperTable } from './superTable.component';
import { SuperTableHead } from './superTableHead.component';
import { SuperTableBody } from './superTableBody.component';
import { SuperTableRow } from './superTableRow.component';
import { DummyRows } from './dummyRows.component';
import { TableHeader, Resizer } from './tableHeader.component';
export * from './interfaces';
export { superTableSorters } from './superTableSorters';
export { superTableFilters } from './superTableFilters';
import { SuperTableCell } from './superTableCell.component';
export { SuperTableCell } from './superTableCell.component';
import { TableCell } from './tableCell.component';
import { TextFilter } from './textFilter.component';
import { EnumFilter, EnumFilterDropdown } from './enumFilter.component';


@NgModule({
  // Components declared in this library
  declarations: [
    SuperTable,
    SuperTableHead,
    SuperTableBody,
    SuperTableCell,
    SuperTableRow,
    DummyRows,
    TableHeader,
    TableCell,
    Resizer,
    TextFilter,
    EnumFilter,
    EnumFilterDropdown
  ],
  imports: [CommonModule, FormsModule],
  exports: [SuperTable, SuperTableCell],
  entryComponents: [
    EnumFilterDropdown
  ]
})
export class SuperTableModule {}
