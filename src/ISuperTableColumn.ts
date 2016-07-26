import { ISuperTableSorter } from './superTableSorters';
export interface ISuperTableColumn {
  id : string;
  key : string;
  label : string;
  width? : number;
  lockWidth? : boolean;
  sort?: ISuperTableSorter;
}
