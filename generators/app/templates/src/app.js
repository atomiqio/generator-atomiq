'use strict';

// required to emulate a full ES6 environment
// https://babeljs.io/docs/usage/polyfill/
require('babel-polyfill');

const app = require('express')();
const bodyParser = require('body-parser');
const debug = require('debug')('app');
const morgan = require('morgan');
const path = require('path');
const pkg = require('../package.json');
const port = process.env.PORT || 3000;
const routeLoader = require('./lib/routeloader');
const routeDir = path.join(__dirname, 'routes');

module.exports = app;

app.set('name', pkg.name);
app.set('version', pkg.version);

app.use(morgan(process.env.NODE_ENV || 'dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

routeLoader.load(app, routeDir);

if (require.main === module) {
  app.set('port', port);
  const server = app.listen(app.get('port'), () => {
    debug('%s %s listening on port %s', pkg.name, pkg.version, server.address().port);
    app.set('server', server);

    // close server gracefully...
    // handle ctrl-c
    exitOnSignal('SIGINT');
    // handle docker stop
    exitOnSignal('SIGTERM');

    function exitOnSignal(signal) {
      process.on(signal, () => {
        debug(`$(signal) received, stopping server...`);
        server.close(() => {
          debug('server stopped');
          process.exit();
        });
      });
    }
  });
}
