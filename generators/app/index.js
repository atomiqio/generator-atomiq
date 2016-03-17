'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var fs = require('fs');
var path = require('path');
var childProcess = require('child_process');
var version = require('../../package.json').version;

module.exports = yeoman.Base.extend({
  constructor: function() {
    yeoman.generators.Base.apply(this, arguments);

    this.argument('name', {
      desc: 'Project name',
      type: String,
      optional: true,
      defaults: 'app' // this.appname // current folder name
    });
  },

  initializing: function() {
    var result;

    result = childProcess.execSync('which docker-machine');
    if (!result) {
      this.log('Error: %s not found in path (have you installed Docker Toolbox?)',
        chalk.bold('docker-machine'));
      process.exit(1);
    }

    try {
      childProcess.execSync('docker-machine active');
    } catch (e) {
      this.log('You must set the environment for Docker. Try:');
      this.log(chalk.bold('  eval "$(docker-machine env <name>)"'));
      this.log('(To list all installed Docker host machine names, try %s)',
        chalk.bold('docker-machine ls'));
      process.exit(1);
    }
  },

  prompting: function() {
    var done = this.async();
    this.log('Node.js Docker boilerplate, v.%s', version);

    this.prompt({
      type: 'input',
      name: 'name',
      message: 'Project name',
      default: this.name
    }, function(props) {
      if (this.props) {
        throw new Error('this.props already exists');
      }
      this.props = props;
      this.name = props.name;
      done();
    }.bind(this));
  },

  configuring: function() {
    this.destDir = path.join(process.cwd(), this.name);

    try {
      fs.mkdirSync(this.destDir);
    } catch (e) {
      this.log('Error: project directory already exists: %s', this.destDir);
      process.exit(1);
    }

    this.destinationRoot(this.destDir);
  },

  writing: function() {
    // // copy dotfiles
    // this.fs.copy(
    //   this.templatePath('./**/.*'),
    //   this.destinationPath('.')
    // );
    //
    // // copy non-dotfiles
    // this.fs.copy(
    //   this.templatePath('./**/*'),
    //   this.destinationPath('.')
    // );

    this.fs.copy(
      this.templatePath('./**'),
      this.destinationPath('.')
    );

    var props = {name: this.name};

    // TODO: package.json rules: need to ensure valid package name and valid image name
    // package name spec: https://docs.npmjs.com/files/package.json#name
    // image name spec: [A-Za-z0-9_.-] are allowed, minimum 2, maximum 30 in length
    // (https://github.com/docker/docker/pull/7996/files)
    // process templates
    var templated = [
      {
        src: '_common.yml',
        dest: 'common.yml'
      },
      {
        // not really a template, but can't have an exposed .npmignore file when
        // publishing generator; this ensure _npmignore will be removed from dest
        src: '_npmignore',
        dest: '.npmigore'
      },
      {
        src: '_package.json',
        dest: 'package.json'
      },
      {
        src: '_README.md',
        dest: 'README.md'
      }
    ];

    templated.forEach(f => {
      this.fs.copyTpl(
        this.templatePath(f.src), this.destinationPath(f.dest), props
      );
      this.fs.delete(this.destinationPath(f.src));
    });

  },

  install: function() {},

  end: function() {
    this.log('OK. Try running the app in a container. Enter:\n%s\n%s\n%s',
      chalk.bold('   cd ' + this.name),
      chalk.bold('   npm install'),
      chalk.bold('   node make'));
    this.log('Then, from the same directory in another terminal, enter:');
    this.log(chalk.bold('   node make host'));
    this.log('to get the actual Docker machine IP:PORT for the container');
  }
});
