import { FILTER_TYPE, ISuperTableFilter } from './interfaces';

export interface IBuiltInFilters {
  STRING: ISuperTableFilter;
  NUMBER: ISuperTableFilter;
  DATE: ISuperTableFilter;
  ENUM: ISuperTableFilter;
}

// For date filter
const unitmap: Object = {};
unitmap['second'] = unitmap['sec'] = unitmap['s'] = 1000;
unitmap['minute'] = unitmap['min'] = unitmap['m'] = unitmap['second'] * 60;
unitmap['hour'] = unitmap['hr'] = unitmap['h']    = unitmap['minute'] * 60;
unitmap['day'] = unitmap['d']                  = unitmap['hour'] * 24;
unitmap['week'] = unitmap['wk'] = unitmap['w']    = unitmap['day'] * 7;
unitmap['month']                            = unitmap['week'] * 4;
unitmap['year'] = unitmap['yr'] = unitmap['y']    = unitmap['day'] * 365;

const clauseExp: RegExp = /(\d+(?:\.\d+)?)\s*([a-z]+)/;
function parseDateFilter(str: string): number {
  // split on clauses (if any)
  const clauses: string[] = str.trim().split(',');
  let total = 0;

  // parse each clause
  for (let i = 0; i < clauses.length; i++) {
    const clause: string = clauses[i].trim();
    const terms: RegExpExecArray = clauseExp.exec(clause);
    if (!terms) {
      continue;
    }
    const count: number = parseFloat(terms[1]);
    const unit: string = terms[2].replace(/s$/, '');
    if (! unitmap.hasOwnProperty(unit) ) {
      continue;
    }
    total += count * unitmap[unit];
  }
  return total;
}

export const superTableFilters: IBuiltInFilters = {
  STRING: {
    type: 'TEXT',
    title: 'Search by text, eg. "foo". Use "!" to ' +
           'exclude and "=" to match exact text, e.g. ' +
           '"!bar" or "=baz".',
    isActive: function(filterValue: any): boolean {
      return !!filterValue && !!(filterValue as string).trim();
    },
    placeholder: 'string search',
    fn: function(term: string, value: any, row: Object): boolean {
      term = term.toLowerCase().trim();
      value = String(value).toLowerCase();
      const first: string = term[0];

      // negate
      if (first === '!') {
        term = term.substr(1);
        if (term === '') {
          return true;
        }
        return value.indexOf(term) === -1;
      }

      // strict
      if (first === '=') {
        term = term.substr(1);
        return term === value.trim();
      }

      // remove escaping backslashes
      term = term.replace('\\!', '!');
      term = term.replace('\\=', '=');

      return value.indexOf(term) !== -1;
    }

  },
  NUMBER: {
    type: 'TEXT',
    title: 'Search by number, e.g. "123". Optionally use comparator ' +
           'expressions like ">=10" or "<1000". Use "~" for approx. ' +
           'int values, eg. "~3" will match "3.2"',
    isActive: function(filterValue: any): boolean {
      return !!filterValue && !!(filterValue as string).trim();
    },
    placeholder: 'number search',
    fn: function(term: string, value: any, row: Object): boolean {
      const parsedValue: number = parseFloat(value);
      term = term.trim();
      const firstTwo: string = term.substr(0, 2);
      const firstChar: string = term[0];
      const against1: number = parseFloat(term.substr(1));
      const against2: number = parseFloat(term.substr(2));
      if ( firstTwo === '<=' ) {
        return parsedValue <= against2 ;
      }
      if ( firstTwo === '>=' ) {
        return parsedValue >= against2 ;
      }
      if ( firstChar === '<' ) {
        return parsedValue < against1 ;
      }
      if ( firstChar === '>' ) {
        return parsedValue > against1 ;
      }
      if ( firstChar === '~' ) {
        return Math.round(parsedValue) === against1 ;
      }
      if ( firstChar === '=' ) {
        return against1 === parsedValue ;
      }
      return value.toString().indexOf(term.toString()) > -1 ;
    }
  },
  DATE: {
    type: 'TEXT',
    title: 'Search by date. Enter a date string (RFC2822 or ' +
           'ISO 8601 date). You can also type "today", "yesterday", ' +
           '"> 2 days ago", "< 1 day 2 hours ago", etc.',
    isActive: function(filterValue: any): boolean {
      return !!filterValue && !!(filterValue as string).trim();
    },
    placeholder: 'date search',
    fn: function(term: string, value: Date | number): boolean{
      // today
      // yesterday
      // 1 day ago
      // 2 days ago

      // < 1 day ago
      // < 10 minutes ago
      // < 10 min ago
      // < 10 minutes, 50 seconds ago
      // > 10 min, 30 sec ago
      // > 2 days ago
      // >= 1 day ago
      term = term.trim();
      if (!term) {
        return true;
      }
      const numValue: number = value.valueOf();
      const nowDate: Date = new Date();
      const now: number = nowDate.valueOf();
      const first_char: string = term[0];
      const other_chars: string = (term.substr(1)).trim();
      let lowerbound: number, upperbound: number;
      if ( first_char === '<' ) {
        lowerbound = now - parseDateFilter(other_chars);
        return numValue > lowerbound;
      }
      if ( first_char === '>' ) {
        upperbound = now - parseDateFilter(other_chars);
        return numValue < upperbound;
      }

      if ( term === 'today') {
        return new Date(numValue).toDateString() === nowDate.toDateString();
      }

      if ( term === 'yesterday') {
        return new Date(numValue).toDateString() === new Date(now - unitmap['d']).toDateString();
      }

      const supposedDate: Date = new Date(term);
      if (!isNaN(supposedDate.valueOf())) {
        return new Date(numValue).toDateString() === supposedDate.toDateString();
      }

      return false;
    }
  },
  ENUM: {
    type: 'ENUM',
    title: 'Click to filter rows by discreet values',
    placeholder: 'filters',
    isActive: function(filterValue: any): boolean {
      if (!filterValue) {
        return false;
      }
      const filterValueObj: Object = filterValue as Object;
      return Object.keys( filterValueObj ).some(key => {
        return !filterValueObj[key];
      });
    },
    fn: function(filterValue: any, value: any, row: Object): boolean {
      const filterValueObj: Object = filterValue as Object;
      return filterValueObj[value];
    }
  }
};
