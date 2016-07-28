# ng2 super table
[![Build Status](https://travis-ci.org/andyperlitch/ng2-super-table.svg?branch=master)](https://travis-ci.org/andyperlitch/ng2-super-table)
[![npm version](https://badge.fury.io/js/ng2-super-table.svg)](http://badge.fury.io/js/ng2-super-table)
[![devDependency Status](https://david-dm.org/andyperlitch/ng2-super-table/dev-status.svg)](https://david-dm.org/andyperlitch/ng2-super-table#info=devDependencies)
[![GitHub issues](https://img.shields.io/github/issues/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/issues)
[![GitHub stars](https://img.shields.io/github/stars/andyperlitch/ng2-super-table.svg)](https://github.com/andyperlitch/ng2-super-table/stargazers)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://raw.githubusercontent.com/andyperlitch/ng2-super-table/master/LICENSE)

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
import {HelloWorld} from 'ng2-super-table';

@Component({
  selector: 'demo-app',
  directives: [HelloWorld],
  template: '<hello-world></hello-world>'
})
export class DemoApp {}
```

You may also find it useful to view the [demo source](https://github.com/andyperlitch/ng2-super-table/blob/master/demo/demo.ts).

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
- [ ] cell formatting (text)
- [X] custom cell component
- [ ] column ordering
- [-] column-based filtering
  - [X] string
  - [X] number
  - [ ] enum
  - [ ] custom
- [ ] hiding/showing columns


## License

MIT
