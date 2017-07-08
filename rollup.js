export default {
  entry: './deploy/super-table.js',
  dest: './deploy/super-table.umd.js',
  format: 'umd',
  moduleName: 'ng2-super-table',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx'
  }
};
