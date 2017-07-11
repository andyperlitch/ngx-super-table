export default {
  entry: './deploy/index.js',
  dest: './deploy/index.umd.js',
  format: 'umd',
  moduleName: 'ngx-super-table',
  globals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/platform-browser': 'ng.platformBrowser',
    'rxjs/Observable': 'Rx',
    'rxjs/Subject': 'Rx'
  }
};
