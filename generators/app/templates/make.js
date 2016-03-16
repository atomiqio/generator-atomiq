#!/usr/bin/env node
require('shelljs/make');

var exec = require('child_process').execSync;
var minimist = require('minimist');
var optimist = require('optimist');
var path = require('path');
var spawn = require('child_process').spawnSync;

var options = optimist.argv;
var spawnopts = { env: process.env, stdio: 'inherit' };

var app = path.join('dist', 'app.js');
var testDir = path.join('dist', 'test');

// should be run from project root
cd(__dirname);

// include node_modules/.bin in path, just like 'npm run' scripts
process.env.PATH = path.join(path.join('./node_modules', '.bin') +
  path.delimiter +
  process.env.PATH);

// default task
target.all = function() {
  target.build();
  target.run();
};

// clean dist
target.clean = function() {
  rm('-rf', './dist');
};

// build dist
target.build = function() {
  target.babel();
};

// transpile src -> dist with sourcemap files
target.babel = function() {
  target.clean();
  spawn('babel', ['src', '-d', 'dist', '--source-maps'], spawnopts);
};

// transpile src -> dist with inline sourcemaps
target.babelinline = function() {
  target.clean();
  spawn('babel', ['src', '-d', 'dist', '--source-maps', 'inline'], spawnopts);
};

// if anything in src changes, re-transpile to dist
target.watch = function() {
  target.clean();
  spawn('babel', ['--watch', 'src', '-d', 'dist', '--source-maps'], spawnopts);
};

// if anything in dist changes, restart server
target.monitor = function() {
  if (options.local) {
    debugReminder();
    spawn('nodemon',
      ['--legacy-watch', '--watch', 'dist', '-e', 'js,json', '--exec', 'node ' + app],
      spawnopts);
  } else {
    console.log('remember: while monitoring, you can also enter "rs" in the console to manually restart');
    spawn('nodemon',
      ['--legacy-watch', '--watch', 'dist', '-e', 'js,json', '--exec', 'docker-compose up --force-recreate'],
      spawnopts);
  }
};

// run mocha tests
target.test = function() {
  target.babel();
  if (options.local) {
    debugReminder();
    spawn('mocha', [testDir], spawnopts);
  } else {
    spawn('docker-compose', ['-f', 'test.yml', 'up', '--force-recreate'], spawnopts);
  }
};

// run app
target.run = function() {
  if (options.local) {
    debugReminder();
    spawn('node', [app], spawnopts);
  } else {
    spawn('docker-compose', ['up', '--force-recreate'], spawnopts);
  }
};

// debug app using node inspector
target.debug = function() {
  if (options.local) {
    debugReminder();
    spawn('node-debug', ['--no-preload', '--web-host', '0.0.0.0', app], spawnopts);
  } else {
    spawn('docker-compose', ['-f', 'debug.yml', 'up', '--force-recreate'], spawnopts);
  }
};

// if container is running, get host (ip:port)
target.host = function() {
  try {
    var active = exec('docker-machine active').toString('utf8');
    var host = exec('docker-machine ip ' + active).toString('utf8').trim();
    var port = exec('docker-compose port web 3000').toString('utf8').split(':')[1].trim();
    console.log('%s:%s', host, port);
  } catch (err) {
    console.log('Error: make sure that a container is running first');
  }
};

function debugReminder() {
  if (!process.env.DEBUG) {
    console.log('Make sure to set DEBUG environment variable to see debug output (ex: DEBUG=app*)');
  }
}
