import {Component, OnInit} from '@angular/core';
import {SuperTable, ISuperTableColumn, ISuperTableOptions} from '../ng2-super-table';

const NUM_ROWS = 10000;

@Component({
  selector: 'demo-app',
  directives: [SuperTable],
  template: `<super-table [rows]="rows" [columns]="columns" [options]="options" [tableClasses]="tableClasses"></super-table>`,
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
  tableClasses = ['table', 'table-bordered'];
  rows: Array<MyRow> = [];
  columns: Array<ISuperTableColumn> = [
    {
      key: 'firstName',
      label: 'First'
    },
    {
      key: 'lastName',
      label: 'Last'
    }
  ];
  options: ISuperTableOptions = {
    autoHeight: true // auto size the table to the parent element
  };

  private lastNames = [
    'Davis',
    'Monk',
    'Gordon',
    'Coltrane',
    'Henderson',
    'Rollins'
  ];

  private firstNames = [
    'Miles',
    'Thelonious',
    'Dexter',
    'John',
    'Joe',
    'Sonny'
  ];

  ngOnInit() {
    this.rows = this.generateRows(NUM_ROWS);
  }

  private generateRows (count: number) : Array<MyRow> {
    let result = [];
    for (let i = 0; i < count; i++) {
      result.push({
        firstName: this.chooseRandom(this.firstNames),
        lastName: this.chooseRandom(this.lastNames)
      });
    }
    return result;
  }

  private chooseRandom (choices: Array<string>) : string {
    let randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  }
}

interface MyRow {
  firstName: string;
  lastName: string;
}
