# ng2 super table
[![Build Status](https://travis-ci.org/andyperlitch/ng2-super-table.svg?branch=master)](https://travis-ci.org/andyperlitch/ng2-super-table)
[![npm version](https://badge.fury.io/js/ng2-super-table.svg)](http://badge.fury.io/js/ng2-super-table)
[![devDependency Status](https://david-dm.org/andyperlitch/ng2-super-table/dev-status.svg)](https://david-dm.org/andyperlitch/ng2-super-table#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/issues)
[![GitHub stars](https://img.shields.io/github/stars/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andyperlitch/ng2-super-table/master/LICENSE)

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
https://andyperlitch.github.io/ng2-super-table/demo/

## Table of contents

- [About](#about)
- [Installation](#installation)
- [Documentation](#documentation)
- [Development](#development)
- [License](#licence)

## About

A table component for angular2 projects

## Installation

Install through npm:
```
npm install --save ng2-super-table
```

Then use it in your app like so:

```typescript
import {Component} from '@angular/core';
import {SuperTable, ISuperTableColumn} from 'ng2-super-table';

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

Please view the [demo source](https://github.com/andyperlitch/ng2-super-table/blob/master/demo/demo.ts) for a much more feature-complete example.

### Usage without a module bundler
```
<script src="node_modules/ng2-super-table/ng2-super-table.js"></script>
<script>
    // everything is exported ng2SuperTable namespace
</script>
```

## Documentation
All documentation is auto-generated from the source via typedoc and can be viewed here:
https://andyperlitch.github.io/ng2-super-table/docs/

## Development

### Prepare your environment
* Install [Node.js](http://nodejs.org/) and NPM (should come with)
* Install local dev dependencies: `npm install` while current directory is this repo

### Development server
Run `npm start` to start a development server on port 8000 with auto reload + tests.

### Testing
Run `npm test` to run tests once or `npm run test:watch` to continually run tests.

### Release
* Bump the version in package.json (once the module hits 1.0 this will become automatic)
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
