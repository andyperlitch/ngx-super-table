import {
  Component,
  Input,
  OnInit,
  OnDestroy,
  ElementRef,
  ComponentFactoryResolver,
  ViewContainerRef,
  ComponentRef,
  Injector
} from '@angular/core';
import { ISuperTableFilter, ColumnState } from './interfaces';
import { SuperTableState } from './super-table-state';
import { Subscription } from 'rxjs/Subscription';
import { forEach, values } from 'lodash';

@Component({
  selector: 'super-table-enum-filter-dropdown',
  template: `
    <div class="clear-filter">
      <button class="btn btn-secondary clear-filter-btn" role="button" (click)="showAll()">show all</button>
    </div>
    <div *ngFor="let choice of column.def.filterChoices">
      <input type="checkbox" [(ngModel)]="column.filterValue[choice]" (ngModelChange)="onChoiceChange($event)" />
      {{ choice }}
    </div>
    <button role="button" class="close-dropdown" (click)="destroyMe()">&times;</button>
  `,
  styles: [`
    :host {
      position: absolute;
      background: white;
      padding: 5px 10px;
      border: 1px solid #ddd;
      box-shadow: 0 1px 10px -1px rgba(0,0,0,0.2);
    }
    .clear-filter {
      border-bottom: 1px solid #DDD;
      padding: 5px 0;
    }
    .close-dropdown {
      position: absolute;
      top: 5px;
      right: 10px;
      border: none;
      background: transparent;
      color: #CCC;
      display: block;
      width: 20px;
      height: 20px;
      line-height: 20px;
    }
    .close-dropdown:hover {
      color: #AAA;
    }
  `]
})
export class EnumFilterDropdownComponent implements OnInit, OnDestroy {
  @Input() column: ColumnState;
  top: number;
  left: number;
  width: number;
  destroyMe: Function;

  constructor(
    private state: SuperTableState,
    private el: ElementRef
  ) {}

  ngOnInit (): void {
    const styles: CSSStyleDeclaration = this.el.nativeElement.style;
    styles.top = this.top + 'px';
    styles.left = this.left + 'px';
    styles.width = this.width + 'px';
  }

  ngOnDestroy (): void {
    // to ensure that references to parent component
    // do not prevent GC
    this.destroyMe = null;
  }

  onChoiceChange(): void {
    this.state.notify();
  }

  showAll(): void {
    forEach(this.column.filterValue, (val, key) => {
      this.column.filterValue[key] = true;
    });
    this.state.notify();
    this.destroyMe();
  }
}

@Component({
  /* tslint:disable-next-line */
  selector: '[super-table-enum-filter]',
  template: `
    <button
      [attr.title]="filter.title"
      role="button"
      (click)="toggleVisibility($event)"
      [ngClass]="{ hasDisabled : disabledFilterCount }">
      <strong>{{ filter.placeholder }}:</strong>
      <span [hidden]="disabledFilterCount != 0">showing all</span>
      <span [hidden]="disabledFilterCount == 0">filtering {{disabledFilterCount}} value(s)</span>
    </button>

  `,
  styles: [`
    :host {
      position: relative;
      display: block;
      height: 100%;
      font-size: 90%;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    button {
      text-align: left;
      margin: 0 5px;
      display: block;
      width: calc(100% - 10px);
      height: 100%;
      background: #ddd;
      border: none;
      border-radius: 2px;
    }
    button.hasDisabled {
      background: rgba(22, 140, 239, 0.2);
    }
    .enum-filter-dropdown {
      position: absolute;
      top: 100%;
      z-index: 1;
    }
  `]
})
export class EnumFilterComponent implements OnInit, OnDestroy {
  @Input() filter: ISuperTableFilter;
  @Input() column: ColumnState;

  private dropdown: ComponentRef<EnumFilterDropdownComponent>;
  private disabledChoices: Set<any> = new Set<any>();
  disabledFilterCount = 0;
  private subscription: Subscription;

  constructor(
    private state: SuperTableState,
    private el: ElementRef,
    private viewContainer: ViewContainerRef,
    private resolver: ComponentFactoryResolver
  ) {}

  ngOnInit (): void {
    // initialize filtered values to include all
    this.column.filterValue = {};
    this.column.def.filterChoices.forEach(choice => {
      this.column.filterValue[choice] = true;
    });
    this.subscription = this.state.stateChanged$.subscribe(() => {
      this.disabledFilterCount = values(this.column.filterValue)
        .filter(isEnabled => !isEnabled)
        .length;
    });
  }

  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  toggleVisibility(): void {
    if (this.dropdown) {
      this.dropdown.destroy();
      this.dropdown = null;
    } else {
      const clientRect: ClientRect = this.el.nativeElement.getBoundingClientRect();
      const cmpFactory = this.resolver.resolveComponentFactory(EnumFilterDropdownComponent);
      const ctxInjector: Injector = this.viewContainer.injector;
      const cmpRef: ComponentRef<EnumFilterDropdownComponent> = this.viewContainer.createComponent(cmpFactory, 0, ctxInjector);
      cmpRef.instance.column = this.column;
      cmpRef.instance.top = clientRect.top + clientRect.height;
      cmpRef.instance.left = clientRect.left;
      cmpRef.instance.width = clientRect.width;
      cmpRef.instance.destroyMe = () => {
        this.toggleVisibility();
      };
      this.dropdown = cmpRef;
      document.body.appendChild(cmpRef.location.nativeElement);
    }
  }
}
