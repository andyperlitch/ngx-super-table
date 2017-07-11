# ng2 super table
[![Build Status](https://travis-ci.org/andyperlitch/ng2-super-table.svg?branch=master)](https://travis-ci.org/andyperlitch/ng2-super-table)
[![npm version](https://badge.fury.io/js/ng2-super-table.svg)](http://badge.fury.io/js/ng2-super-table)
[![devDependency Status](https://david-dm.org/andyperlitch/ng2-super-table/dev-status.svg)](https://david-dm.org/andyperlitch/ng2-super-table#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/issues)
[![GitHub stars](https://img.shields.io/github/stars/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andyperlitch/ng2-super-table/master/MIT-LICENSE)

**NOTE: This library currently does not support the latest version of angular2 with @NgModules. See [this issue](https://github.com/andyperlitch/ng2-super-table/issues/3).**

A table component with the following features:

- row virtualization
- row sorting (stackable)
- cell formatting (text)
- custom cell component
- column resizing
- column-based filtering
  - string
  - number
  - enum
  - custom

![angular2 super table screenshot](http://i.imgur.com/ERUHmza.png)


## Demo

[https://andyperlitch.github.io/ng2-super-table/demo/](https://andyperlitch.github.io/ng2-super-table/demo/)

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#license)

## About

A table component for Angular projects

## Installation

Install through npm:
```
npm install --save ng2-super-table
```

Then use it in your app like so:

```typescript
import { Component } from '@angular/core';
import { SuperTable, ISuperTableColumn } from 'ng2-super-table';

@Component({
  selector: 'demo-app',
  directives: [SuperTable],
  template: `<super-table
    [rows]="rows"
    [columns]="columns"
    [options]="options">
  </super-table>`
})
export class DemoApp {
  rows = [
    { name: 'thing1', age: 7 },
    { name: 'thing2', age: 7 },
    { name: 'cat', age: 10 },
    { name: 'fish', age: 1 },
  ];
  columns: ISuperTableColumn[] = [
    {
      id: 'name',
      key: 'name'
      label: 'Name'
    },
    {
      id: 'age',
      key: 'age'
      label: 'Age'
    }
  ];
  options = {}
}
```

Please view the [demo source](https://github.com/andyperlitch/ng2-super-table/blob/master/src/app/demo.component.ts) for a much more feature-complete example.

### Usage without a module bundler
```
<script src="node_modules/ng2-super-table/index.js"></script>
<script>
    // everything is exported ng2SuperTable namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:

[https://andyperlitch.github.io/ng2-super-table/docs/](https://andyperlitch.github.io/ng2-super-table/docs/)

## Development

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.0.0-rc.2.

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive/pipe/service/class/module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

### Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Release

* Bump the version in `src/lib/package.json` (once the module hits 1.0 this will become automatic)

```bash
npm run release
```

## TODO
- [X] row virtualization
- [X] column resizing
- [X] row sorting (stacked, via columns)
- [X] cell formatting (text)
- [X] custom cell component
- [X] column-based filtering
  - [X] string
  - [X] number
  - [X] enum
  - [X] custom
- [ ] hiding/showing columns


## License

MIT
