const sourcemaps = require('rollup-plugin-sourcemaps');

export default {
  entry: './deploy/index.js',
  dest: './deploy/index.umd.js',
  format: 'umd',
  moduleName: 'ngx-super-table',
  sourceMap: true,
  external: [
    '@angular/core',
    '@angular/common',
    '@angular/forms',
    'lodash',
    'rxjs/BehaviorSubject',
    'rxjs/Observable',
    'rxjs/Subject',
    'rxjs/Subscription'
  ],
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/forms': 'ng.forms',
    '@angular/platform-browser': 'ng.platformBrowser',
    'lodash': '_',
    'rxjs/BehaviorSubject': 'Rx',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx',
    'rxjs/Subscription': 'Rx'
  },
  plugins: [
    sourcemaps()
  ]
};
