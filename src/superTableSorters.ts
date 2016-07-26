export interface ISuperTableSorter {
  (row1Value: any, row2Value: any, row1: Object, row2: Object): number;
}

interface IBuiltInSorters {
  STRING: ISuperTableSorter;
  NUMBER: ISuperTableSorter;
}

export const superTableSorters: IBuiltInSorters = {
  STRING: function(val1: string, val2: string) {
    return val1.localeCompare(val2);
  },
  NUMBER: function(val1: number, val2: number) {
    return val1 - val2;
  }
}
