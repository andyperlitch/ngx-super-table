import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  Injector,
  Input,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ViewContainerRef
} from '@angular/core';
import { ColumnState } from './interfaces';

@Component({
  /* tslint:disable-next-line */
  selector: '[super-table-cell]',
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
export class TableCellComponent implements AfterViewInit, OnDestroy {
  @Input() row: any;
  @Input() column: ColumnState;
  @ViewChild('cmpContainer', { read: ViewContainerRef }) cmpContainer: ViewContainerRef;

  private componentRef: ComponentRef<any>;

  constructor(private viewContainer: ViewContainerRef, private resolver: ComponentFactoryResolver) {}

  getValue(): any {
    return this.row[this.column.def.key];
  }

  getFormattedValue(): any {
    if (this.column.def.format) {
      return this.column.def.format(this.getValue(), this.row, this.column);
    }

    return this.getValue();
  }

  ngAfterViewInit(): void {
    if (this.column.def.component) {
      if (this.componentRef) {
        this.componentRef.destroy();
      }
      const cmpFactory = this.resolver.resolveComponentFactory(this.column.def.component);
      const ctxInjector: Injector = this.cmpContainer.injector;
      this.componentRef = this.cmpContainer.createComponent(cmpFactory, 0, ctxInjector);
      const instance: any = this.componentRef.instance;
      instance['row'] = this.row;
      instance['column'] = this.column;
      instance['key'] = this.column.def.key;
      instance['value'] = this.getValue();
      this.componentRef.changeDetectorRef.detectChanges();
    }
  }

  ngOnDestroy(): void {
    if (this.componentRef) {
      this.componentRef.destroy();
    }
  }
}
