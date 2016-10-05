import { NgModule }      from '@angular/core';
import {SuperTable} from './src/superTable.component';
import { SuperTableHead } from './src/superTableHead.component';
import { SuperTableBody } from './src/superTableBody.component';
import { SuperTableRow } from './src/superTableRow.component';
import { DummyRows } from './src/dummyRows.component';
import { TableHeader, Resizer } from './src/tableHeader.component';
export * from './src/interfaces';
export {superTableSorters} from './src/superTableSorters';
export {superTableFilters} from './src/superTableFilters';
import {SuperTableCell} from './src/superTableCell.component';
export {SuperTableCell} from './src/superTableCell.component';
import { TableCell } from './src/tableCell.component';
import { TextFilter } from './src/textFilter.component';
import { EnumFilter } from './src/enumFilter.component';


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
    EnumFilter
  ],
  exports: [SuperTable, SuperTableCell]
})
export class SuperTableModule {}
