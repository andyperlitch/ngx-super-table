webpackJsonp(["main"],{

/***/ "./ngx-super-table/esm5/ngx-super-table.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return superTableSorters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return superTableFilters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return SuperTableModule; });
/* unused harmony export SuperTableComponent */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SuperTableCellComponent; });
/* unused harmony export ɵe */
/* unused harmony export ɵk */
/* unused harmony export ɵj */
/* unused harmony export ɵc */
/* unused harmony export ɵb */
/* unused harmony export ɵd */
/* unused harmony export ɵh */
/* unused harmony export ɵf */
/* unused harmony export ɵg */
/* unused harmony export ɵi */
/* unused harmony export ɵa */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__ = __webpack_require__("./node_modules/rxjs/_esm5/BehaviorSubject.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_lodash_es_debounce__ = __webpack_require__("./node_modules/lodash-es/debounce.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash_es_forEach__ = __webpack_require__("./node_modules/lodash-es/forEach.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_lodash_es_values__ = __webpack_require__("./node_modules/lodash-es/values.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");







/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var sortCycle = ['ASC', 'DESC', undefined];
var getNextSortOrder = function (currentSortOrder) {
    var /** @type {?} */ nextIndex = (sortCycle.indexOf(currentSortOrder) + 1) % sortCycle.length;
    return sortCycle[nextIndex];
};
var SuperTableState = /** @class */ (function () {
    function SuperTableState() {
        // publicly exposed properties
        this.hasAnyFilters = false;
        this.sortStack = [];
        this.stateChangedSource = new __WEBPACK_IMPORTED_MODULE_1_rxjs_BehaviorSubject__["a" /* BehaviorSubject */](this);
        this.stateChanged$ = this.stateChangedSource.asObservable();
    }
    /**
     * @param {?} columns
     * @return {?}
     */
    SuperTableState.prototype.setColumns = function (columns) {
        var _this = this;
        this.columns = columns.map(function (c) {
            if (!!c.filter) {
                _this.hasAnyFilters = true;
            }
            return {
                id: c.id,
                filterValue: undefined,
                sortOrder: undefined,
                isHidden: false,
                width: c.width || undefined,
                def: c,
                hasSort: !!c.sort,
                hasFilter: !!c.filter
            };
        });
    };
    /**
     * @param {?} colState
     * @param {?} doNotClear
     * @return {?}
     */
    SuperTableState.prototype.toggleSort = function (colState, doNotClear) {
        // Set next sort order
        colState.sortOrder = getNextSortOrder(colState.sortOrder);
        // Check if we are clearing the rest of the sort stack or not
        if (doNotClear) {
            var /** @type {?} */ curIndex = this.sortStack.indexOf(colState);
            if (curIndex === -1) {
                this.sortStack.push(colState);
            }
            else if (!colState.sortOrder) {
                this.sortStack.splice(curIndex, 1);
            }
        }
        else {
            this.sortStack = colState.sortOrder ? [colState] : [];
            this.columns.forEach(function (column) {
                if (column !== colState) {
                    column.sortOrder = undefined;
                }
            });
        }
        this.notify();
    };
    /**
     * @return {?}
     */
    SuperTableState.prototype.notify = function () {
        this.stateChangedSource.next(this);
    };
    return SuperTableState;
}());
SuperTableState.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */] },
];
/** @nocollapse */
SuperTableState.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SuperTableComponent = /** @class */ (function () {
    /**
     * @param {?} el
     * @param {?} state
     */
    function SuperTableComponent(el, state) {
        this.el = el;
        this.state = state;
        // properties
        this.isReady = false;
        this.hasError = false;
    }
    /**
     * @return {?}
     */
    SuperTableComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.subscription = this.state.stateChanged$.subscribe(function () { return _this.sortAndFilterRows(); });
    };
    /**
     * @return {?}
     */
    SuperTableComponent.prototype.ngAfterContentInit = function () {
        if (this.options.autoHeight) {
            var /** @type {?} */ parentHeight = this.el.nativeElement.parentElement.clientHeight;
            this.setTableHeight(parentHeight);
        }
        this.isReady = true;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SuperTableComponent.prototype.ngOnChanges = function (changes) {
        // Inform state of columns changes
        if (changes['columns'] && changes['columns'].isFirstChange()) {
            this.state.setColumns(changes['columns'].currentValue);
        }
        this.sortAndFilterRows();
    };
    /**
     * @return {?}
     */
    SuperTableComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} totalHeight
     * @return {?}
     */
    SuperTableComponent.prototype.setTableHeight = function (totalHeight) {
        // calculate header height
        var /** @type {?} */ headerHeight = this.el.nativeElement.querySelector('super-table-head').offsetHeight;
        // subtract it from totalHeight, set bodyHeight to result
        this.bodyHeight = totalHeight - headerHeight;
    };
    /**
     * @return {?}
     */
    SuperTableComponent.prototype.sortAndFilterRows = function () {
        var _this = this;
        // Filtering
        var /** @type {?} */ activeFilterColumns = this.state.columns.filter(function (c) {
            return !!c.def.filter && !!c.def.filter.isActive(c.filterValue);
        });
        if (activeFilterColumns.length) {
            this.filteredSortedRows = this.rows.filter(function (row) {
                for (var /** @type {?} */ i = 0; i < activeFilterColumns.length; i++) {
                    var /** @type {?} */ colState = activeFilterColumns[i];
                    var /** @type {?} */ val = row[colState.def.key];
                    var /** @type {?} */ filterResult = false;
                    if (colState.def.filter) {
                        filterResult = colState.def.filter.fn(colState.filterValue, val, row);
                        if (filterResult === false) {
                            return false;
                        }
                    }
                }
                return true;
            });
        }
        else {
            this.filteredSortedRows = this.rows.slice();
        }
        // Sorting
        this.filteredSortedRows.sort(function (a, b) {
            for (var /** @type {?} */ i = 0; i < _this.state.sortStack.length; i++) {
                var /** @type {?} */ colState = _this.state.sortStack[i];
                var /** @type {?} */ val1 = a[colState.def.key];
                var /** @type {?} */ val2 = b[colState.def.key];
                var /** @type {?} */ compareResult = 0;
                if (colState.def.sort) {
                    compareResult = colState.sortOrder === 'ASC'
                        ? colState.def.sort(val1, val2, a, b)
                        : colState.def.sort(val2, val1, b, a);
                }
                if (compareResult !== 0) {
                    return compareResult;
                }
            }
            return 0;
        });
    };
    return SuperTableComponent;
}());
SuperTableComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'super-table',
                template: "\n    <super-table-head [tableClasses]=\"tableClasses\"></super-table-head>\n    <super-table-body\n      *ngIf=\"isReady\"\n      [rows]=\"filteredSortedRows\"\n      [tableClasses]=\"tableClasses\"\n      [options]=\"options\"\n      [style.height]=\"bodyHeight + 'px'\"\n      [bodyHeight]=\"bodyHeight\">\n    </super-table-body>\n    <div\n      class=\"loading-message\"\n      *ngIf=\"!isReady && !hasError\">\n      Loading...\n    </div>\n    <div *ngIf=\"hasError\">An error occurred.</div>\n  ",
                styles: ["\n    :host {\n      position: relative;\n      display: block;\n    }\n    .loading-message {\n      text-align: center;\n    }\n  "],
                providers: [SuperTableState]
            },] },
];
/** @nocollapse */
SuperTableComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
    { type: SuperTableState, },
]; };
SuperTableComponent.propDecorators = {
    "rows": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "columns": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "options": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "tableClasses": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SuperTableHeadComponent = /** @class */ (function () {
    /**
     * @param {?} state
     */
    function SuperTableHeadComponent(state) {
        this.state = state;
    }
    return SuperTableHeadComponent;
}());
SuperTableHeadComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'super-table-head',
                template: "\n    <table [ngClass]=\"tableClasses\">\n      <thead>\n        <tr>\n          <th\n            *ngFor=\"let column of state.columns\"\n            super-table-header\n            scope=\"col\"\n            [column]=\"column\"\n            [ngClass]=\"{ hasSort: column.hasSort }\"></th>\n        </tr>\n        <tr *ngIf=\"state.hasAnyFilters\" class=\"filter-row\">\n          <td *ngFor=\"let column of state.columns\">\n            <div *ngIf=\"column.hasFilter\" [ngSwitch]=\"column.def.filter.type\">\n              <div *ngSwitchCase=\"'TEXT'\" super-table-text-filter [filter]=\"column.def.filter\" [column]=\"column\"></div>\n              <div *ngSwitchCase=\"'ENUM'\" super-table-enum-filter [filter]=\"column.def.filter\" [column]=\"column\"></div>\n            </div>\n          </td>\n        </tr>\n      </thead>\n    </table>\n  ",
                styles: ["\n    :host {\n      overflow-y: scroll;\n      display: block;\n    }\n    .hasSort {\n      cursor: pointer;\n    }\n    table {\n      table-layout: fixed;\n      width: 100%;\n      margin-bottom: 0;\n      border-bottom: none;\n    }\n    .filter-row td {\n      padding: 0;\n      vertical-align: middle;\n    }\n  "]
            },] },
];
/** @nocollapse */
SuperTableHeadComponent.ctorParameters = function () { return [
    { type: SuperTableState, },
]; };
SuperTableHeadComponent.propDecorators = {
    "tableClasses": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DEFAULT_ROW_HEIGHT = 20;
var PADDING_ROW_COUNT = 20;
var DEBOUNCE_DELAY = 250;
var SuperTableBodyComponent = /** @class */ (function () {
    /**
     * @param {?} el
     * @param {?} state
     */
    function SuperTableBodyComponent(el, state) {
        var _this = this;
        this.el = el;
        this.state = state;
        this.visibleRows = [];
        // assume small row height at first.
        // The real height will be detected once rows are rendered.
        this.rowHeight = DEFAULT_ROW_HEIGHT;
        this.rowOffset = 0;
        this.scrollHandler = Object(__WEBPACK_IMPORTED_MODULE_2_lodash_es_debounce__["a" /* default */])(function () {
            _this.updateVisibleRows();
        }, DEBOUNCE_DELAY);
        this.resizeHandler = Object(__WEBPACK_IMPORTED_MODULE_2_lodash_es_debounce__["a" /* default */])(function () {
            _this.detectRowHeight();
            _this.updateVisibleRows();
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    SuperTableBodyComponent.prototype.ngOnChanges = function (changes) {
        this.updateVisibleRows();
    };
    /**
     * @return {?}
     */
    SuperTableBodyComponent.prototype.trackScroll = function () {
        this.scrollHandler();
    };
    /**
     * @return {?}
     */
    SuperTableBodyComponent.prototype.onWindowResize = function () {
        this.resizeHandler();
    };
    /**
     * @return {?}
     */
    SuperTableBodyComponent.prototype.updateVisibleRows = function () {
        var _this = this;
        var /** @type {?} */ startIndex, /** @type {?} */ endIndex;
        var /** @type {?} */ currentScroll = this.el.nativeElement.scrollTop;
        startIndex = Math.floor(currentScroll / this.rowHeight - PADDING_ROW_COUNT);
        startIndex = Math.max(0, startIndex);
        this.rowOffset = startIndex;
        endIndex = Math.ceil((currentScroll + this.bodyHeight) / this.rowHeight + PADDING_ROW_COUNT);
        endIndex = Math.min(this.rows.length, endIndex);
        this.visibleRows = this.rows.slice(startIndex, endIndex);
        setTimeout(function () {
            _this.detectRowHeight();
        });
    };
    /**
     * @return {?}
     */
    SuperTableBodyComponent.prototype.detectRowHeight = function () {
        var /** @type {?} */ tr = this.el.nativeElement.querySelector('tbody.visible-rows tr');
        if (tr != null) {
            this.rowHeight = tr.offsetHeight;
        }
    };
    return SuperTableBodyComponent;
}());
SuperTableBodyComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'super-table-body',
                template: "\n    <table [ngClass]=\"tableClasses\">\n      <thead class=\"sizing-thead\">\n        <tr>\n          <th scope=\"col\" *ngFor=\"let column of state.columns\" super-table-header [column]=\"column\" [noHeight]=\"true\"></th>\n        </tr>\n      </thead>\n      <tbody\n        class=\"dummy-rows\"\n        super-table-dummy-rows\n        [columnCount]=\"state.columns.length\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rowOffset\">\n      </tbody>\n      <tbody class=\"visible-rows\">\n        <tr *ngFor=\"let row of visibleRows\" super-table-row [row]=\"row\"></tr>\n      </tbody>\n      <tbody\n        class=\"dummy-rows\"\n        super-table-dummy-rows\n        [columnCount]=\"state.columns.length\"\n        [rowHeight]=\"rowHeight\"\n        [rowCount]=\"rows.length - rowOffset - visibleRows.length - 1\">\n      </tbody>\n    </table>\n  ",
                styles: ["\n    :host {\n      display: block;\n      overflow: auto;\n    }\n    table {\n      table-layout: fixed;\n      width: 100%;\n      margin-bottom: 0;\n    }\n    thead.sizing-thead th {\n      padding: 0 !important;\n      border-width: 0;\n    }\n    tbody.dummy-rows, tbody.visible-rows {\n      border-top: none;\n    }\n  "]
            },] },
];
/** @nocollapse */
SuperTableBodyComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
    { type: SuperTableState, },
]; };
SuperTableBodyComponent.propDecorators = {
    "rows": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "tableClasses": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "bodyHeight": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "options": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "trackScroll": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */], args: ['scroll',] },],
    "onWindowResize": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */], args: ['resize',] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SuperTableRowComponent = /** @class */ (function () {
    /**
     * @param {?} state
     */
    function SuperTableRowComponent(state) {
        this.state = state;
    }
    return SuperTableRowComponent;
}());
SuperTableRowComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-row]',
                template: "<td *ngFor=\"let column of state.columns\" super-table-cell [row]=\"row\" [column]=\"column\"></td>"
            },] },
];
/** @nocollapse */
SuperTableRowComponent.ctorParameters = function () { return [
    { type: SuperTableState, },
]; };
SuperTableRowComponent.propDecorators = {
    "row": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var DummyRowsComponent = /** @class */ (function () {
    function DummyRowsComponent() {
        this.BG_IMAGE_DATA = [
            'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAAlCAYAAACDKIOp',
            'AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAABtJREFUeNpiuH',
            'v37n+G////MzAxAMHQIQACDAC7twbaN2nkgwAAAABJRU5ErkJggg=='
        ].join('');
    }
    /**
     * @return {?}
     */
    DummyRowsComponent.prototype.rowStyleHeight = function () {
        var /** @type {?} */ height = this.rowHeight * this.rowCount;
        return height + "px";
    };
    /**
     * @return {?}
     */
    DummyRowsComponent.prototype.backgroundSize = function () {
        return "auto " + this.rowHeight + "px";
    };
    return DummyRowsComponent;
}());
DummyRowsComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-dummy-rows]',
                template: "\n    <tr [style.height]=\"rowStyleHeight()\">\n      <td\n        [attr.colspan]=\"columnCount\"\n        [style.backgroundImage]=\"'url(' + BG_IMAGE_DATA + ')'\"\n        [style.backgroundSize]=\"backgroundSize()\">\n      </td>\n    </tr>\n  ",
                styles: ["\n    :host {\n      border: none !important;\n    }\n    td {\n      padding: 0 !important;\n      border: none !important;\n      background-repeat: repeat;\n      background-position: 0 -1px;\n    }\n  "]
            },] },
];
/** @nocollapse */
DummyRowsComponent.ctorParameters = function () { return []; };
DummyRowsComponent.propDecorators = {
    "rowHeight": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "rowCount": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "columnCount": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ResizerComponent = /** @class */ (function () {
    /**
     * @param {?} el
     */
    function ResizerComponent(el) {
        this.el = el;
    }
    Object.defineProperty(ResizerComponent.prototype, "title", {
        /**
         * @return {?}
         */
        get: function () {
            return 'Click-and-drag to resize. Click to clear specified width.';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} grabEvt
     * @return {?}
     */
    ResizerComponent.prototype.grab = function (grabEvt) {
        var _this = this;
        grabEvt.preventDefault();
        var /** @type {?} */ mousedownTime = Date.now();
        var /** @type {?} */ initClientX = grabEvt.clientX;
        var /** @type {?} */ initWidth = this.column.width || this.getActualParentWidth();
        var /** @type {?} */ drag = function (event) {
            var /** @type {?} */ change = event.clientX - initClientX;
            _this.column.width = Math.max(initWidth + change, ResizerComponent.MIN_COLUMN_WIDTH);
        };
        var /** @type {?} */ unbindDrag = function () {
            window.removeEventListener('mousemove', drag);
            window.removeEventListener('mouseup', unbindDrag);
            if (Date.now() - mousedownTime < ResizerComponent.MAX_CLICK_WAIT) {
                _this.column.width = undefined;
            }
        };
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', unbindDrag);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    ResizerComponent.prototype.stopClick = function (event) {
        event.preventDefault();
        event.stopPropagation();
    };
    /**
     * @return {?}
     */
    ResizerComponent.prototype.getActualParentWidth = function () {
        return this.el.nativeElement.parentElement.offsetWidth;
    };
    return ResizerComponent;
}());
ResizerComponent.MAX_CLICK_WAIT = 250;
ResizerComponent.MIN_COLUMN_WIDTH = 30;
ResizerComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-resizer]',
                template: "<div class=\"notch\" [ngClass]=\"{ explicit: column.width }\"></div>",
                styles: ["\n    :host {\n      position: absolute;\n      right: 0;\n      top: 0;\n      width: 5px;\n      height: 100%;\n      cursor: col-resize;\n    }\n    .notch.explicit {\n      background-color: rgba(22, 140, 239, 0.2);\n    }\n    .notch {\n      width: 100%;\n      height: 50%;\n      transform: translateY(50%);\n      box-shadow: inset 1px 0 #DDD;\n    }\n  "]
            },] },
];
/** @nocollapse */
ResizerComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
]; };
ResizerComponent.propDecorators = {
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "actualWidth": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "title": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostBinding */], args: ['attr.title',] },],
    "grab": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */], args: ['mousedown', ['$event'],] },],
    "stopClick": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */], args: ['click', ['$event'],] },],
};
var TableHeaderComponent = /** @class */ (function () {
    /**
     * @param {?} el
     * @param {?} state
     */
    function TableHeaderComponent(el, state) {
        this.el = el;
        this.state = state;
        this.noHeight = false;
        this.SORT_TITLE = 'Click to change sort order. Shift-click to sort on multiple columns.';
    }
    /**
     * @return {?}
     */
    TableHeaderComponent.prototype.getValue = function () {
        return this.column.def.label;
    };
    Object.defineProperty(TableHeaderComponent.prototype, "width", {
        /**
         * @return {?}
         */
        get: function () {
            return (typeof this.column.width === 'number') ? this.column.width + 'px' : 'auto';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    TableHeaderComponent.prototype.handleClick = function (event) {
        event.preventDefault();
        if (this.column.hasSort) {
            this.state.toggleSort(this.column, event.shiftKey);
        }
    };
    return TableHeaderComponent;
}());
TableHeaderComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-header]',
                template: "\n    <div *ngIf=\"!noHeight\" class=\"table-header-div\" [title]=\"SORT_TITLE\">\n      <span *ngIf=\"column.def.sort\" class=\"sort-icon\">\n        <span [ngSwitch]=\"column.sortOrder\">\n          <span class=\"asc-sort glyphicon glyphicon-sort-by-attributes\" *ngSwitchCase=\"'ASC'\"></span>\n          <span class=\"desc-sort glyphicon glyphicon-sort-by-attributes-alt\" *ngSwitchCase=\"'DESC'\"></span>\n          <span class=\"no-sort glyphicon glyphicon-sort\" *ngSwitchDefault></span>\n        </span>\n      </span>\n      {{ getValue() }}\n    </div>\n    <div *ngIf=\"!noHeight && !column.def.lockWidth\" super-table-resizer [column]=\"column\"></div>\n  ",
                styles: ["\n    :host {\n      position:relative;\n      -webkit-touch-callout: none;\n      -webkit-user-select: none;\n      -khtml-user-select: none;\n      -moz-user-select: none;\n      -ms-user-select: none;\n      user-select: none;\n    }\n    :host:hover .sort-icon {\n      opacity: 1;\n    }\n    .table-header-div {\n      position: relative;\n    }\n    .sort-icon {\n      font-size: 70%;\n      opacity: 1;\n      color: #168cef;\n      text-shadow: 0 1px 2px rgba(22, 140, 239, 0.6);\n    }\n    .sort-icon .no-sort {\n      opacity: 0.3;\n      text-shadow: none;\n      color: black;\n    }\n  "]
            },] },
];
/** @nocollapse */
TableHeaderComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
    { type: SuperTableState, },
]; };
TableHeaderComponent.propDecorators = {
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "noHeight": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "width": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["x" /* HostBinding */], args: ['style.width',] },],
    "handleClick": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["y" /* HostListener */], args: ['click', ['$event'],] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SuperTableCellComponent = /** @class */ (function () {
    function SuperTableCellComponent() {
    }
    return SuperTableCellComponent;
}());
SuperTableCellComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'super-table-cell',
                template: ""
            },] },
];
/** @nocollapse */
SuperTableCellComponent.ctorParameters = function () { return []; };
SuperTableCellComponent.propDecorators = {
    "row": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "key": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "value": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TableCellComponent = /** @class */ (function () {
    /**
     * @param {?} viewContainer
     * @param {?} resolver
     */
    function TableCellComponent(viewContainer, resolver) {
        this.viewContainer = viewContainer;
        this.resolver = resolver;
    }
    /**
     * @return {?}
     */
    TableCellComponent.prototype.getValue = function () {
        return this.row[this.column.def.key];
    };
    /**
     * @return {?}
     */
    TableCellComponent.prototype.getFormattedValue = function () {
        if (this.column.def.format) {
            return this.column.def.format(this.getValue(), this.row, this.column);
        }
        return this.getValue();
    };
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngAfterViewInit = function () {
        if (this.column.def.component) {
            if (this.componentRef) {
                this.componentRef.destroy();
            }
            var /** @type {?} */ cmpFactory = this.resolver.resolveComponentFactory(this.column.def.component);
            var /** @type {?} */ ctxInjector = this.cmpContainer.injector;
            this.componentRef = this.cmpContainer.createComponent(cmpFactory, 0, ctxInjector);
            var /** @type {?} */ instance = this.componentRef.instance;
            instance['row'] = this.row;
            instance['column'] = this.column;
            instance['key'] = this.column.def.key;
            instance['value'] = this.getValue();
            this.componentRef.changeDetectorRef.detectChanges();
        }
    };
    /**
     * @return {?}
     */
    TableCellComponent.prototype.ngOnDestroy = function () {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    };
    return TableCellComponent;
}());
TableCellComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-cell]',
                template: "\n    <span *ngIf=\"!column.def.component\" [attr.title]=\"getFormattedValue()\">{{ getFormattedValue() }}</span>\n    <span *ngIf=\"column.def.component\" #cmpContainer></span>\n  ",
                styles: ["\n    :host {\n      white-space: nowrap;\n      text-overflow: ellipsis;\n      overflow: hidden;\n    }\n  "]
            },] },
];
/** @nocollapse */
TableCellComponent.ctorParameters = function () { return [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ComponentFactoryResolver */], },
]; };
TableCellComponent.propDecorators = {
    "row": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "cmpContainer": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_9" /* ViewChild */], args: ['cmpContainer', { read: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */] },] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var TextFilterComponent = /** @class */ (function () {
    /**
     * @param {?} state
     */
    function TextFilterComponent(state) {
        this.state = state;
        this.onModelChange = Object(__WEBPACK_IMPORTED_MODULE_2_lodash_es_debounce__["a" /* default */])(function () {
            this.state.notify();
        }, 200);
    }
    /**
     * @return {?}
     */
    TextFilterComponent.prototype.clearFilter = function () {
        this.column.filterValue = '';
        this.state.notify();
    };
    return TextFilterComponent;
}());
TextFilterComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-text-filter]',
                template: "\n    <input\n      class=\"form-control input-sm\"\n      type=\"text\"\n      [(ngModel)]=\"column.filterValue\"\n      (ngModelChange)=\"onModelChange()\"\n      [attr.placeholder]=\"filter.placeholder\"\n      [attr.title]=\"filter.title\"\n      [ngClass]=\"{ hasContent: !!column.filterValue }\" />\n    <button tabindex=\"-1\" *ngIf=\"column.filterValue\" class=\"clear-btn\" role=\"button\" (click)=\"clearFilter($event)\">&times;</button>\n  ",
                styles: ["\n    :host {\n      position: relative;\n    }\n    input {\n      width: 100%;\n      font-size: 90%;\n      border: none;\n      border-radius: 0;\n    }\n    .hasContent {\n      background: #dff7ff;\n    }\n    .clear-btn {\n      position: absolute;\n      background: transparent;\n      color: black;\n      right: 0;\n      top: 0;\n      border: none;\n      font-size: 120%;\n    }\n  "]
            },] },
];
/** @nocollapse */
TextFilterComponent.ctorParameters = function () { return [
    { type: SuperTableState, },
]; };
TextFilterComponent.propDecorators = {
    "filter": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var EnumFilterDropdownComponent = /** @class */ (function () {
    /**
     * @param {?} state
     * @param {?} el
     */
    function EnumFilterDropdownComponent(state, el) {
        this.state = state;
        this.el = el;
    }
    /**
     * @return {?}
     */
    EnumFilterDropdownComponent.prototype.ngOnInit = function () {
        var /** @type {?} */ styles = this.el.nativeElement.style;
        styles.top = this.top + 'px';
        styles.left = this.left + 'px';
        styles.width = this.width + 'px';
    };
    /**
     * @return {?}
     */
    EnumFilterDropdownComponent.prototype.ngOnDestroy = function () {
        // to ensure that references to parent component
        // do not prevent GC
        this.destroyMe = undefined;
    };
    /**
     * @return {?}
     */
    EnumFilterDropdownComponent.prototype.onChoiceChange = function () {
        this.state.notify();
    };
    /**
     * @return {?}
     */
    EnumFilterDropdownComponent.prototype.showAll = function () {
        var _this = this;
        Object(__WEBPACK_IMPORTED_MODULE_3_lodash_es_forEach__["a" /* default */])(this.column.filterValue, function (val, key) {
            _this.column.filterValue[key] = true;
        });
        this.state.notify();
        if (this.destroyMe) {
            this.destroyMe();
        }
    };
    return EnumFilterDropdownComponent;
}());
EnumFilterDropdownComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                selector: 'super-table-enum-filter-dropdown',
                template: "\n    <div class=\"clear-filter\">\n      <button class=\"btn btn-outline-secondary clear-filter-btn\" role=\"button\" (click)=\"showAll()\">show all</button>\n    </div>\n    <div *ngFor=\"let choice of column.def.filterChoices\">\n      <input type=\"checkbox\" [(ngModel)]=\"column.filterValue[choice]\" (ngModelChange)=\"onChoiceChange()\" />\n      {{ choice }}\n    </div>\n    <button role=\"button\" class=\"close-dropdown\" (click)=\"destroyMe()\">&times;</button>\n  ",
                styles: ["\n    :host {\n      position: absolute;\n      background: white;\n      padding: 5px 10px;\n      border: 1px solid #ddd;\n      box-shadow: 0 1px 10px -1px rgba(0,0,0,0.2);\n    }\n    .clear-filter {\n      border-bottom: 1px solid #DDD;\n      padding: 5px 0;\n    }\n    .close-dropdown {\n      position: absolute;\n      top: 5px;\n      right: 10px;\n      border: none;\n      background: transparent;\n      color: #CCC;\n      display: block;\n      width: 20px;\n      height: 20px;\n      line-height: 20px;\n    }\n    .close-dropdown:hover {\n      color: #AAA;\n    }\n  "]
            },] },
];
/** @nocollapse */
EnumFilterDropdownComponent.ctorParameters = function () { return [
    { type: SuperTableState, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
]; };
EnumFilterDropdownComponent.propDecorators = {
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
var EnumFilterComponent = /** @class */ (function () {
    /**
     * @param {?} state
     * @param {?} el
     * @param {?} viewContainer
     * @param {?} resolver
     */
    function EnumFilterComponent(state, el, viewContainer, resolver) {
        this.state = state;
        this.el = el;
        this.viewContainer = viewContainer;
        this.resolver = resolver;
        this.disabledChoices = new Set();
        this.disabledFilterCount = 0;
    }
    /**
     * @return {?}
     */
    EnumFilterComponent.prototype.ngOnInit = function () {
        var _this = this;
        // initialize filtered values to include all
        this.column.filterValue = {};
        if (this.column.def.filterChoices) {
            this.column.def.filterChoices.forEach(function (choice) {
                _this.column.filterValue[choice] = true;
            });
        }
        this.subscription = this.state.stateChanged$.subscribe(function () {
            _this.disabledFilterCount = Object(__WEBPACK_IMPORTED_MODULE_4_lodash_es_values__["a" /* default */])(_this.column.filterValue)
                .filter(function (isEnabled) { return !isEnabled; })
                .length;
        });
    };
    /**
     * @return {?}
     */
    EnumFilterComponent.prototype.ngOnDestroy = function () {
        this.subscription.unsubscribe();
    };
    /**
     * @return {?}
     */
    EnumFilterComponent.prototype.toggleVisibility = function () {
        var _this = this;
        if (this.dropdown) {
            this.dropdown.destroy();
            this.dropdown = undefined;
        }
        else {
            var /** @type {?} */ clientRect = this.el.nativeElement.getBoundingClientRect();
            var /** @type {?} */ cmpFactory = this.resolver.resolveComponentFactory(EnumFilterDropdownComponent);
            var /** @type {?} */ ctxInjector = this.viewContainer.injector;
            var /** @type {?} */ cmpRef = this.viewContainer.createComponent(cmpFactory, 0, ctxInjector);
            cmpRef.instance.column = this.column;
            cmpRef.instance.top = clientRect.top + clientRect.height;
            cmpRef.instance.left = clientRect.left;
            cmpRef.instance.width = clientRect.width;
            cmpRef.instance.destroyMe = function () {
                _this.toggleVisibility();
            };
            this.dropdown = cmpRef;
            document.body.appendChild(cmpRef.location.nativeElement);
        }
    };
    return EnumFilterComponent;
}());
EnumFilterComponent.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */], args: [{
                /* tslint:disable-next-line */
                selector: '[super-table-enum-filter]',
                template: "\n    <button\n      [attr.title]=\"filter.title\"\n      role=\"button\"\n      (click)=\"toggleVisibility()\"\n      [ngClass]=\"{ hasDisabled : disabledFilterCount }\">\n      <strong>{{ filter.placeholder }}:</strong>\n      <span [hidden]=\"disabledFilterCount != 0\">showing all</span>\n      <span [hidden]=\"disabledFilterCount == 0\">filtering {{disabledFilterCount}} value(s)</span>\n    </button>\n  ",
                styles: ["\n    :host {\n      position: relative;\n      display: block;\n      height: 100%;\n      font-size: 90%;\n      white-space: nowrap;\n      text-overflow: ellipsis;\n    }\n    button {\n      text-align: left;\n      margin: 0 5px;\n      display: block;\n      width: calc(100% - 10px);\n      height: 100%;\n      background: #ddd;\n      border: none;\n      border-radius: 2px;\n    }\n    button.hasDisabled {\n      background: rgba(22, 140, 239, 0.2);\n    }\n    .enum-filter-dropdown {\n      position: absolute;\n      top: 100%;\n      z-index: 1;\n    }\n  "]
            },] },
];
/** @nocollapse */
EnumFilterComponent.ctorParameters = function () { return [
    { type: SuperTableState, },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["t" /* ElementRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["_10" /* ViewContainerRef */], },
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["p" /* ComponentFactoryResolver */], },
]; };
EnumFilterComponent.propDecorators = {
    "filter": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
    "column": [{ type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */] },],
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var SuperTableModule = /** @class */ (function () {
    function SuperTableModule() {
    }
    /**
     * @return {?}
     */
    SuperTableModule.forRoot = function () {
        return {
            ngModule: SuperTableModule,
            providers: []
        };
    };
    return SuperTableModule;
}());
SuperTableModule.decorators = [
    { type: __WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */], args: [{
                // Components declared in this library
                declarations: [
                    SuperTableComponent,
                    SuperTableHeadComponent,
                    SuperTableBodyComponent,
                    SuperTableCellComponent,
                    SuperTableRowComponent,
                    DummyRowsComponent,
                    TableHeaderComponent,
                    TableCellComponent,
                    ResizerComponent,
                    TextFilterComponent,
                    EnumFilterComponent,
                    EnumFilterDropdownComponent
                ],
                imports: [
                    __WEBPACK_IMPORTED_MODULE_5__angular_common__["b" /* CommonModule */],
                    __WEBPACK_IMPORTED_MODULE_6__angular_forms__["a" /* FormsModule */]
                ],
                exports: [
                    SuperTableComponent,
                    SuperTableCellComponent
                ],
                entryComponents: [
                    EnumFilterDropdownComponent
                ]
            },] },
];
/** @nocollapse */
SuperTableModule.ctorParameters = function () { return []; };
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var superTableSorters = {
    STRING: function (val1, val2) {
        return val1.localeCompare(val2);
    },
    NUMBER: function (val1, val2) {
        return val1 - val2;
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @record
 */
// For date filter
var unitmap = {};
unitmap['second'] = unitmap['sec'] = unitmap['s'] = 1000;
unitmap['minute'] = unitmap['min'] = unitmap['m'] = unitmap['second'] * 60;
unitmap['hour'] = unitmap['hr'] = unitmap['h'] = unitmap['minute'] * 60;
unitmap['day'] = unitmap['d'] = unitmap['hour'] * 24;
unitmap['week'] = unitmap['wk'] = unitmap['w'] = unitmap['day'] * 7;
unitmap['month'] = unitmap['week'] * 4;
unitmap['year'] = unitmap['yr'] = unitmap['y'] = unitmap['day'] * 365;
var clauseExp = /(\d+(?:\.\d+)?)\s*([a-z]+)/;
/**
 * @param {?} str
 * @return {?}
 */
function parseDateFilter(str) {
    // split on clauses (if any)
    var /** @type {?} */ clauses = str.trim().split(',');
    var /** @type {?} */ total = 0;
    // parse each clause
    for (var /** @type {?} */ i = 0; i < clauses.length; i++) {
        var /** @type {?} */ clause = clauses[i].trim();
        var /** @type {?} */ terms = clauseExp.exec(clause);
        if (!terms) {
            continue;
        }
        var /** @type {?} */ count = parseFloat(terms[1]);
        var /** @type {?} */ unit = terms[2].replace(/s$/, '');
        if (!unitmap.hasOwnProperty(unit)) {
            continue;
        }
        total += count * unitmap[unit];
    }
    return total;
}
var superTableFilters = {
    STRING: {
        type: 'TEXT',
        title: 'Search by text, eg. "foo". Use "!" to ' +
            'exclude and "=" to match exact text, e.g. ' +
            '"!bar" or "=baz".',
        isActive: function (filterValue) {
            return !!filterValue && !!((filterValue)).trim();
        },
        placeholder: 'string search',
        fn: function (term, value, row) {
            term = term.toLowerCase().trim();
            value = String(value).toLowerCase();
            var /** @type {?} */ first = term[0];
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
        isActive: function (filterValue) {
            return !!filterValue && !!((filterValue)).trim();
        },
        placeholder: 'number search',
        fn: function (term, value, row) {
            var /** @type {?} */ parsedValue = parseFloat(value);
            term = term.trim();
            var /** @type {?} */ firstTwo = term.substr(0, 2);
            var /** @type {?} */ firstChar = term[0];
            var /** @type {?} */ against1 = parseFloat(term.substr(1));
            var /** @type {?} */ against2 = parseFloat(term.substr(2));
            if (firstTwo === '<=') {
                return parsedValue <= against2;
            }
            if (firstTwo === '>=') {
                return parsedValue >= against2;
            }
            if (firstChar === '<') {
                return parsedValue < against1;
            }
            if (firstChar === '>') {
                return parsedValue > against1;
            }
            if (firstChar === '~') {
                return Math.round(parsedValue) === against1;
            }
            if (firstChar === '=') {
                return against1 === parsedValue;
            }
            return value.toString().indexOf(term.toString()) > -1;
        }
    },
    DATE: {
        type: 'TEXT',
        title: 'Search by date. Enter a date string (RFC2822 or ' +
            'ISO 8601 date). You can also type "today", "yesterday", ' +
            '"> 2 days ago", "< 1 day 2 hours ago", etc.',
        isActive: function (filterValue) {
            return !!filterValue && !!((filterValue)).trim();
        },
        placeholder: 'date search',
        fn: function (term, value) {
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
            var /** @type {?} */ numValue = value.valueOf();
            var /** @type {?} */ nowDate = new Date();
            var /** @type {?} */ now = nowDate.valueOf();
            var /** @type {?} */ first_char = term[0];
            var /** @type {?} */ other_chars = (term.substr(1)).trim();
            var /** @type {?} */ lowerbound, /** @type {?} */ upperbound;
            if (first_char === '<') {
                lowerbound = now - parseDateFilter(other_chars);
                return numValue > lowerbound;
            }
            if (first_char === '>') {
                upperbound = now - parseDateFilter(other_chars);
                return numValue < upperbound;
            }
            if (term === 'today') {
                return new Date(numValue).toDateString() === nowDate.toDateString();
            }
            if (term === 'yesterday') {
                return new Date(numValue).toDateString() === new Date(now - unitmap['d']).toDateString();
            }
            var /** @type {?} */ supposedDate = new Date(term);
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
        isActive: function (filterValue) {
            if (!filterValue) {
                return false;
            }
            var /** @type {?} */ filterValueObj = (filterValue);
            return Object.keys(filterValueObj).some(function (key) {
                return !filterValueObj[key];
            });
        },
        fn: function (filterValue, value, row) {
            var /** @type {?} */ filterValueObj = (filterValue);
            return filterValueObj[value];
        }
    }
};
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

//# sourceMappingURL=ngx-super-table.js.map


/***/ }),

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRoutingModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_home_home_component__ = __webpack_require__("./src/app/modules/home/home.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var routes = [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    {
        path: 'home',
        component: __WEBPACK_IMPORTED_MODULE_2__modules_home_home_component__["a" /* HomeComponent */]
    }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* RouterModule */]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<a href=\"https://github.com/andyperlitch/ngx-super-table\" class=\"hidden-xs\">\n  <img style=\"position: absolute; top: 0; right: 0; border: 0; z-index: 2000\" src=\"https://camo.githubusercontent.com/38ef81f8aca64bb9a64448d0d70f1308ef5341ab/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f6769746875622f726962626f6e732f666f726b6d655f72696768745f6461726b626c75655f3132313632312e706e67\"\n    alt=\"Fork me on GitHub\" data-canonical-src=\"https://s3.amazonaws.com/github/ribbons/forkme_right_darkblue_121621.png\">\n</a>\n\n<nav class=\"navbar navbar-toggleable-md navbar-light bg-faded\">\n  <button class=\"navbar-toggler navbar-toggler-right\" type=\"button\" data-toggle=\"collapse\" data-target=\"#navbar\" aria-controls=\"navbar\"\n    aria-expanded=\"false\" aria-label=\"Toggle navigation\">\n    <span class=\"navbar-toggler-icon\"></span>\n  </button>\n  <a class=\"navbar-brand\" href=\"#\">ngx super table</a>\n\n  <div class=\"collapse navbar-collapse\" id=\"navbar\">\n    <ul class=\"navbar-nav mr-auto\">\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" href=\"#demo\">Demo</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" href=\"https://github.com/andyperlitch/ngx-super-table#installation\">Installation</a>\n      </li>\n      <li class=\"nav-item\">\n        <a class=\"nav-link\" href=\"https://andyperlitch.github.io/ngx-super-table/doc/\">Documentation</a>\n      </li>\n    </ul>\n  </div>\n</nav>\n\n<div class=\"container-fluid\">\n  <router-outlet></router-outlet>\n</div>\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
    }
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        })
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_routing_module__ = __webpack_require__("./src/app/app-routing.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_home_home_module__ = __webpack_require__("./src/app/modules/home/home.module.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__app_routing_module__["a" /* AppRoutingModule */],
                __WEBPACK_IMPORTED_MODULE_5__modules_home_home_module__["a" /* HomeModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_3__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/modules/home/demo.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DemoComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__ = __webpack_require__("./ngx-super-table/esm5/ngx-super-table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__instrument_component__ = __webpack_require__("./src/app/modules/home/instrument.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



var INSTRUMENTS = [
    'sax',
    'trumpet',
    'trombone',
    'piano',
    'keys',
    'drums'
];
var DemoComponent = /** @class */ (function () {
    function DemoComponent() {
        this.tableClasses = ['table', 'table-bordered'];
        this.rows = [];
        this.NUM_ROWS = 10000;
        this.columns = [
            {
                id: 'firstName',
                key: 'firstName',
                label: 'First',
                width: 100,
                sort: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["d" /* superTableSorters */].STRING,
                filter: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["c" /* superTableFilters */].STRING
            },
            {
                id: 'lastName',
                key: 'lastName',
                label: 'Last',
                sort: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["d" /* superTableSorters */].STRING,
                filter: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["c" /* superTableFilters */].STRING
            },
            {
                id: 'instrument',
                key: 'instrument',
                label: 'Instrument',
                sort: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["d" /* superTableSorters */].STRING,
                component: __WEBPACK_IMPORTED_MODULE_2__instrument_component__["a" /* InstrumentComponent */],
                filter: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["c" /* superTableFilters */].ENUM,
                filterChoices: INSTRUMENTS
            },
            {
                id: 'height',
                key: 'height',
                label: 'Height',
                sort: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["d" /* superTableSorters */].NUMBER,
                filter: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["c" /* superTableFilters */].NUMBER,
                format: function (value, row, colState) {
                    var numValue = value;
                    var feet = Math.floor(numValue / 12);
                    var inches = numValue % 12;
                    return feet + "'" + inches + "\"";
                }
            },
            {
                id: 'dob',
                key: 'dob',
                label: 'Birthday',
                sort: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["d" /* superTableSorters */].NUMBER,
                filter: __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["c" /* superTableFilters */].DATE
            }
        ];
        this.options = {
            autoHeight: true // auto size the table to the parent element
        };
        this.lastNames = [
            'Davis',
            'Monk',
            'Gordon',
            'Coltrane',
            'Henderson',
            'Rollins'
        ];
        this.firstNames = [
            'Miles',
            'Thelonious',
            'Dexter',
            'John',
            'Joe',
            'Sonny'
        ];
        this.instruments = INSTRUMENTS;
    }
    DemoComponent.prototype.ngOnInit = function () {
        this.rows = this.generateRows(this.NUM_ROWS);
    };
    DemoComponent.prototype.generateRows = function (count) {
        var result = [];
        for (var i = 0; i < count; i++) {
            result.push({
                firstName: this.chooseRandom(this.firstNames),
                lastName: this.chooseRandom(this.lastNames),
                height: Math.floor(Math.random() * 30) + 60,
                dob: new Date(Date.now() - (Math.random() * 30 + 15) * 365 * 24 * 60 * 60 * 1000),
                instrument: this.chooseRandom(this.instruments)
            });
        }
        return result;
    };
    DemoComponent.prototype.chooseRandom = function (choices) {
        var randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
    };
    DemoComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-demo-app',
            template: "\n    <p class=\"mt-3 mb-2\">\n      The following table has {{NUM_ROWS}} rows, and uses row-virtualization so\n      the DOM is not overloaded. All sorting and filtering occurs on the client\n      side.\n    </p>\n    <super-table\n      [rows]=\"rows\"\n      [columns]=\"columns\"\n      [options]=\"options\"\n      [tableClasses]=\"tableClasses\">\n    </super-table>\n  ",
            styles: ["\n    :host {\n      width: 80%;\n      display: block;\n      margin: 0 auto;\n      height: 600px;\n    }\n  "]
        })
    ], DemoComponent);
    return DemoComponent;
}());



/***/ }),

/***/ "./src/app/modules/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<app-demo-app></app-demo-app>\n"

/***/ }),

/***/ "./src/app/modules/home/home.component.scss":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/modules/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
        this.title = 'app';
    }
    HomeComponent.prototype.ngOnInit = function () { };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/modules/home/home.component.html"),
            styles: [__webpack_require__("./src/app/modules/home/home.component.scss")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/modules/home/home.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__("./node_modules/@angular/common/esm5/common.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ngx_super_table__ = __webpack_require__("./ngx-super-table/esm5/ngx-super-table.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__home_component__ = __webpack_require__("./src/app/modules/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__instrument_component__ = __webpack_require__("./src/app/modules/home/instrument.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__demo_component__ = __webpack_require__("./src/app/modules/home/demo.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_6__demo_component__["a" /* DemoComponent */],
                __WEBPACK_IMPORTED_MODULE_5__instrument_component__["a" /* InstrumentComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_1__angular_common__["b" /* CommonModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3_ngx_super_table__["b" /* SuperTableModule */].forRoot()
            ],
            exports: [],
            entryComponents: [__WEBPACK_IMPORTED_MODULE_5__instrument_component__["a" /* InstrumentComponent */]]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/modules/home/instrument.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return InstrumentComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ngx_super_table__ = __webpack_require__("./ngx-super-table/esm5/ngx-super-table.js");
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


var InstrumentComponent = /** @class */ (function (_super) {
    __extends(InstrumentComponent, _super);
    function InstrumentComponent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    InstrumentComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-instrument-cell',
            template: "<span class=\"badge badge-primary\">{{ value }}</span>"
        })
    ], InstrumentComponent);
    return InstrumentComponent;
}(__WEBPACK_IMPORTED_MODULE_1_ngx_super_table__["a" /* SuperTableCellComponent */]));



/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_14" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map