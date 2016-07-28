import { Component, OnInit } from '@angular/core';
import { SuperTable, ISuperTableColumn, ISuperTableOptions, superTableSorters, superTableFilters } from '../ng2-super-table';
import { InstrumentComponent } from './instrument.component';

const NUM_ROWS: number = 10000;
type INSTRUMENT_TYPE = 'sax' | 'trumpet' | 'trombone' | 'piano' | 'keys' | 'drums';

@Component({
  selector: 'demo-app',
  directives: [SuperTable],
  template: `
    <super-table
      [rows]="rows"
      [columns]="columns"
      [options]="options"
      [tableClasses]="tableClasses">
    </super-table>
  `,
  styles: [`
    :host {
      width: 80%;
      display: block;
      margin: 0 auto;
      height: 600px;
    }
  `]
})
export class DemoApp implements OnInit {
  tableClasses: string[] = ['table', 'table-bordered'];
  rows: MyRow[] = [];
  columns: ISuperTableColumn[] = [
    {
      id: 'firstName',
      key: 'firstName',
      label: 'First',
      width: 100,
      sort: superTableSorters.STRING,
      filter: superTableFilters.STRING
    },
    {
      id: 'lastName',
      key: 'lastName',
      label: 'Last',
      sort: superTableSorters.STRING,
      filter: superTableFilters.STRING
    },
    {
      id: 'instrument',
      key: 'instrument',
      label: 'Instrument',
      sort: superTableSorters.STRING,
      component: InstrumentComponent
    },
    {
      id: 'height',
      key: 'height',
      label: 'Height',
      sort: superTableSorters.NUMBER,
      filter: superTableFilters.NUMBER
    },
    {
      id: 'dob',
      key: 'dob',
      label: 'Birthday',
      sort: superTableSorters.NUMBER,
      filter: superTableFilters.DATE
    }
  ];
  options: ISuperTableOptions = {
    autoHeight: true // auto size the table to the parent element
  };

  private lastNames: string[] = [
    'Davis',
    'Monk',
    'Gordon',
    'Coltrane',
    'Henderson',
    'Rollins'
  ];

  private firstNames: string[] = [
    'Miles',
    'Thelonious',
    'Dexter',
    'John',
    'Joe',
    'Sonny'
  ];

  private instruments: string[] = [
    'sax',
    'trumpet',
    'trombone',
    'piano',
    'keys',
    'drums'
  ];

  ngOnInit() : void {
    this.rows = this.generateRows(NUM_ROWS);
  }

  private generateRows (count: number) : MyRow[] {
    let result: MyRow[] = [];
    for (let i: number = 0; i < count; i++) {
      result.push({
        firstName: this.chooseRandom(this.firstNames),
        lastName: this.chooseRandom(this.lastNames),
        height: Math.floor(Math.random() * 30) + 60,
        dob: new Date(Date.now() - (Math.random() * 30 + 15) * 365 * 24 * 60 * 60 * 1000),
        instrument: this.chooseRandom(this.instruments)
      });
    }
    return result;
  }

  private chooseRandom (choices: string[]) : string {
    let randomIndex: number = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
}

interface MyRow {
  firstName: string;
  lastName: string;
  height: number;
  dob: Date;
  instrument: string;
}
