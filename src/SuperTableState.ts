import { ISuperTableColumn } from './ISuperTableColumn';

export type SORT_ORDER = 'ASC' | 'DESC';

export interface ColumnState {
  id : string;
  filterValue : any;
  sortOrder : SORT_ORDER;
  isHidden : boolean;
  width : number;
  def : ISuperTableColumn;
}

export class SuperTableState {

  public columns : Array<ColumnState>;

  public setColumns ( columns : Array<ISuperTableColumn> ) : void {
    this.columns = columns.map(c => {
      return {
        id: c.id,
        filterValue: null,
        sortOrder: null,
        isHidden: false,
        width: c.width || null,
        def: c
      };
    });
  }

}
