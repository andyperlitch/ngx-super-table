export type FILTER_TYPE = 'TEXT' | 'ENUM';
export type SORT_ORDER = 'ASC' | 'DESC';

export type ISuperTableSorter = (row1Value: any, row2Value: any, row1: Object, row2: Object) => number;

export interface IBuiltInSorters {
  STRING: ISuperTableSorter;
  NUMBER: ISuperTableSorter;
}

export type ISuperTableCellFormatter = (value: any, row: Object, column: ColumnState) => string;

export interface ISuperTableOptions {
  autoHeight?: boolean;
}

export interface ColumnState {
  id: string;
  filterValue: any;
  sortOrder: SORT_ORDER;
  isHidden: boolean;
  width: number;
  def: ISuperTableColumn;
  hasSort: boolean;
  hasFilter: boolean;
}

export interface ISuperTableFilter {
  type: FILTER_TYPE; // text or enum
  title: string;     // tooltip for filter field
  // given the current value of filterValue, returns true or false based on
  // whether that value is considered "active"
  isActive: (filterValue: any) => boolean;
  fn: (filterValue: any, value: any, row: Object) => boolean;
  placeholder: string; // the placeholder text for the input

  // for ENUM type only
  choices?: any[];
}

export interface ISuperTableColumn {
  id: string;
  key: string;
  label: string;
  width?: number;
  lockWidth?: boolean;
  sort?: ISuperTableSorter;
  filter?: ISuperTableFilter;
  format?: ISuperTableCellFormatter;
  component?: any;
  filterChoices?: any[];
}
