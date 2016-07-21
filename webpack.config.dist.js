module.exports = {
  entry: './ng2-super-table.ts',
  output: {
    filename: './ng2-super-table.js',
    libraryTarget: 'umd',
    library: 'ng2SuperTable'
  },
  externals: {
    '@angular/core': {
      root: ['ng', 'core'],
      commonjs: '@angular/core',
      commonjs2: '@angular/core',
      amd: '@angular/core'
    },
    '@angular/common': {
      root: ['ng', 'common'],
      commonjs: '@angular/common',
      commonjs2: '@angular/common',
      amd: '@angular/common'
    }
  },
  devtool: 'source-map',
  module: {
    preLoaders: [{
      test: /\.ts$/, loader: 'tslint?emitErrors=true&failOnHint=true', exclude: /node_modules/
    }],
    loaders: [{
      test: /\.ts$/, loader: 'ts', exclude: /node_modules/,
      query: {
        compilerOptions: {
          declaration: true
        }
      }
    }]
  },
  resolve: {
    extensions: ['', '.ts', '.js']
  }
};
