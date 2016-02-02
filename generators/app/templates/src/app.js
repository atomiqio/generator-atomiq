require('babel-polyfill');

var pkg = require('../package.json');
var debug = require('debug')('app');

console.log('hello docker world');
debug('%s, version %s', pkg.name, pkg.version);
