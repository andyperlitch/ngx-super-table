import {Component, OnInit} from '@angular/core';
import {SuperTable, ISuperTableColumn, ISuperTableOptions, superTableSorters} from '../ng2-super-table';

const NUM_ROWS: number = 10000;

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
  tableClasses: string[] = ['table', 'table-bordered'];
  rows: MyRow[] = [];
  columns: ISuperTableColumn[] = [
    {
      id: 'firstName',
      key: 'firstName',
      label: 'First',
      width: 100,
      sort: superTableSorters.STRING
    },
    {
      id: 'lastName',
      key: 'lastName',
      label: 'Last',
      sort: superTableSorters.STRING
    },
    {
      id: 'age',
      key: 'age',
      label: 'Age',
      sort: superTableSorters.NUMBER
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

  ngOnInit() : void {
    this.rows = this.generateRows(NUM_ROWS);
  }

  private generateRows (count: number) : MyRow[] {
    let result: MyRow[] = [];
    for (let i: number = 0; i < count; i++) {
      result.push({
        firstName: this.chooseRandom(this.firstNames),
        lastName: this.chooseRandom(this.lastNames),
        age: Math.floor(Math.random() * 30) + 15
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
  age: number;
}
