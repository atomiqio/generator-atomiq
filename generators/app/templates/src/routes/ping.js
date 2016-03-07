'use strict';

import debug from 'debug';
import express from 'express';

const log = debug('app:ping');

const Ping = module.exports = function Resource(app) {
  this.app = app;
  this.router = express.Router();

  this.router.get('/', (req, res) => {
    res.json(this.getAppInfo());
  });

};

Ping.prototype.getAppInfo = function() {
  return { service: this.app.get('name'), version: this.app.get('version') };
};
