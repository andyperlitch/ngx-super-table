import {
  Component,
  Input,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  OnInit,
  ViewContainerRef,
  ViewChild
} from '@angular/core';
import { ColumnState } from './interfaces';

@Component({
  selector: '[table-cell]',
  template: `
    <span *ngIf="!column.def.component" [attr.title]="getFormattedValue()">{{ getFormattedValue() }}</span>
    <span *ngIf="column.def.component" #cmpContainer></span>
  `,
  styles: [`
    :host {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  `]
})
export class TableCell implements OnInit {
  @Input() row: any;
  @Input() column: ColumnState;
  @ViewChild('cmpContainer', { read: ViewContainerRef }) cmpContainer: ViewContainerRef;

  constructor(private viewContainer: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

  getValue () : any {
    return this.row[this.column.def.key];
  }
  getFormattedValue() : any {
    return (this.column.def.format)
      ? this.column.def.format(this.getValue(), this.row, this.column)
      : this.getValue();
  }

  ngOnInit () : void {
    if (this.column.def.component) {
      const cmpFactory = this.resolver.resolveComponentFactory(this.column.def.component);
      const ctxInjector: Injector = this.cmpContainer.injector;
      const cmpRef: ComponentRef<any> = this.cmpContainer.createComponent(cmpFactory, 0, ctxInjector);
      const instance: any = cmpRef.instance;
      instance['row'] = this.row;
      instance['column'] = this.column;
      instance['key'] = this.column.def.key;
      instance['value'] = this.getValue();
    }
  }
}
