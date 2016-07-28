import {FILTER_TYPE, ISuperTableFilter} from './interfaces';

interface IBuiltInFilters {
  STRING: ISuperTableFilter;
  NUMBER: ISuperTableFilter;
  DATE: ISuperTableFilter;
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
function parseDateFilter(str: string) : number {
  // split on clauses (if any)
  let clauses: string[] = str.trim().split(',');
  let total: number = 0;

  // parse each clause
  for (let i: number = 0; i < clauses.length; i++) {
    let clause: string = clauses[i].trim();
    let terms: RegExpExecArray = clauseExp.exec(clause);
    if (!terms) {
      continue;
    }
    let count: number = parseFloat(terms[1]);
    let unit: string = terms[2].replace(/s$/, '');
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
    placeholder: 'string search',
    fn: function(term: string, value: any, row: Object) : boolean {
      term = term.toLowerCase().trim();
      value = String(value).toLowerCase();
      let first: string = term[0];

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
    placeholder: 'number search',
    fn: function(term: string, value: any, row: Object) : boolean {
      let parsedValue : number = parseFloat(value);
      term = term.trim();
      let firstTwo : string = term.substr(0, 2);
      let firstChar : string = term[0];
      let against1 : number = parseFloat(term.substr(1));
      let against2 : number = parseFloat(term.substr(2));
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
    placeholder: 'date search',
    fn: function(term: string, value: Date | number) : boolean{
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
      let numValue: number = value.valueOf();
      let nowDate: Date = new Date();
      let now: number = nowDate.valueOf();
      let first_char: string = term[0];
      let other_chars: string = (term.substr(1)).trim();
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

      let supposedDate: Date = new Date(term);
      if (!isNaN(supposedDate.valueOf())) {
        return new Date(numValue).toDateString() === supposedDate.toDateString();
      }

      return false;
    }
  }
};
