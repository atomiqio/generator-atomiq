#!/usr/bin/env node

/*eslint-disable no-undef, no-console, no-empty, lines-around-comment*/
"use strict";
const exec = require('child_process').execSync;
const fs = require('fs');
const optimist = require('optimist');
const path = require('path');
const spawn = require('child_process').spawnSync;

const options = optimist.argv;
// remove options before loading make or else make will
// think they're additional targets and complain
process.argv = process.argv.filter(elem => !elem.startsWith('--'));
require('shelljs/make');

const spawnopts = {
  env: process.env,
  stdio: 'inherit'
};

const app = path.join('dist', 'app.js');
const testDir = path.join('dist', 'test');

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

target.dist = function() {
  target.clean();
  // don't copy js source since babel will do that
  //let source = ['src/**', '!src/**/*.js'];
  copyDir('src', 'dist', {
    recurse: true
  }, f => path.extname(f) != '.js');
};

function copyDir(source, dest, options, filter) {
  mkdir('-p', dest);
  let files = fs.readdirSync(source).filter(filter);
  files.forEach(f => {
    let srcpath = path.join(source, f);
    let stats = fs.statSync(srcpath);
    if (stats.isFile()) {
      let destpath = path.join(dest, f);
      cp(srcpath, destpath);
      console.log(`${srcpath} -> ${destpath}`);
    } else if (stats.isDirectory() && options.recurse) {
      copyDir(path.join(source, f), path.join(dest, f), options, filter);
    }

  });
}

// build dist
target.build = function() {
  target.babel();
  if (!options.local) {
    spawn('docker-compose', ['build'], spawnopts);
  }
};

// build dist and force docker-compose not to use the cache
target.rebuild = function() {
  target.babel();
  if (!options.local) {
    spawn('docker-compose', ['build', '--force-rm', '--no-cache'], spawnopts);
  }
};

// transpile src -> dist with sourcemap files
target.babel = function() {
  target.dist();
  spawn('babel', ['src', '-d', 'dist', '--source-maps'], spawnopts);
};

// transpile src -> dist with inline sourcemaps
target.babelinline = function() {
  target.dist();
  spawn('babel', ['src', '-d', 'dist', '--source-maps', 'inline'], spawnopts);
};

// if anything in src changes, re-transpile to dist
target.watch = function() {
  target.dist();
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
  target.babel();
  if (options.local) {
    debugReminder();
    spawn('node', [app], spawnopts);
  } else {
    spawn('docker-compose', ['up', '--force-recreate'], spawnopts);
  }
};

// debug app using node inspector
target.debug = function() {
  target.babel();
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
    let active = exec('docker-machine active').toString('utf8');
    let host = exec('docker-machine ip ' + active).toString('utf8').trim();
    let port = exec('docker-compose port web 443').toString('utf8').split(':')[1].trim();
    console.log('%s:%s', host, port);
  } catch (err) {
    console.log('Error: make sure that a container is running first');
  }
};

function debugReminder() {
  if (!process.env.DEBUG) {
    console.log('Make sure to set DEBUG environment letiable to see debug output (ex: DEBUG=app*)');
  }
}
