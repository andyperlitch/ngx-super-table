import { SuperTableSorter, BuiltInSorters } from '../models/interfaces';

export const superTableSorters: BuiltInSorters = {
  STRING: function(val1: string, val2: string): number {
    return val1.localeCompare(val2);
  },
  NUMBER: function(val1: number, val2: number): number {
    return val1 - val2;
  }
};
