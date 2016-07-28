import { ISuperTableSorter } from './superTableSorters';
import { ISuperTableFilter } from './superTableFilters';
import { SuperTableCell } from './superTableCell.component';

export interface ISuperTableColumn {
  id : string;
  key : string;
  label : string;
  width? : number;
  lockWidth? : boolean;
  sort?: ISuperTableSorter;
  filter?: ISuperTableFilter;
  component?: any;
}
