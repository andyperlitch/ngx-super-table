import { ISuperTableSorter, IBuiltInSorters } from './interfaces';

export const superTableSorters: IBuiltInSorters = {
  STRING: function(val1: string, val2: string): number {
    return val1.localeCompare(val2);
  },
  NUMBER: function(val1: number, val2: number): number {
    return val1 - val2;
  }
};
