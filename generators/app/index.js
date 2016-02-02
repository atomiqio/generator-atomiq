'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var fs = require('fs');
var path = require('path');
var child_process = require('child_process');
var version = require('../../package.json').version;

module.exports = yeoman.generators.Base.extend({
  constructor: function () {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', {
      desc: 'Project name',
      type: String,
      optional: true,
      defaults: this.appname // current folder name
    });
  },

  initializing: function () {
    var result;

    result = child_process.execSync('which docker-machine');
    if (!result) {
      this.log('Error: %s not found in path (have you installed Docker Toolbox?)',
        chalk.bold('docker-machine'));
      process.exit(1);
    }

    try {
      child_process.execSync('docker-machine active');
    } catch (e) {
      this.log('You must set the environment for Docker. Try:');
      this.log(chalk.bold('  eval "$(docker-machine env <name>)"'));
      this.log('(To list all installed Docker host machine names, try %s)',
        chalk.bold('docker-machine ls'));
      process.exit(1);
    }
  },

  prompting: function () {
    var done = this.async();
    this.log('Node.js API generator, v.%s', version);

    this.prompt({
      type    : 'input',
      name    : 'name',
      message : 'Project name',
      default : this.name
    }, function (props) {
      if (this.props) throw new Error('this.props already exists');
      this.props = props;
      done();
    }.bind(this));
  },

  configuring: function () {
    this.destDir = path.join(process.cwd(), this.name);

    try {
      fs.mkdirSync(this.destDir);
    } catch (e) {
      this.log('Error: project directory already exists: %s', this.destDir);
      process.exit(1);
    }

    this.destinationRoot(this.destDir);
  },

  writing: function () {
    // copy dotfiles
    this.fs.copy(
      this.templatePath('./**/.*'),
      this.destinationPath('.')
    );

    // copy non-dotfiles
    this.fs.copy(
      this.templatePath('./**/*'),
      this.destinationPath('.')
    );

    // process templates
    this.fs.copyTpl(
      this.templatePath('package.json'),
      this.destinationPath('package.json'),
      {
        name: this.name
      }
    );
  },

  install: function () {
    this.npmInstall();
    //this.spawnCommand('npm', ['run', 'docker-build']);
  },

  end: function () {
    this.log('Done. Enter %s to change to the project directory.',
      chalk.bold('cd ' + this.name));
  }
});
