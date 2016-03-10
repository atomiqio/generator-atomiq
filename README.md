# generator-atomiq [![NPM version][npm-image]][npm-url]

> Generate a Node microservice with Docker, Express, Babel, Node Inspector support, and
  optional directory-based routing conventions.

`atomiq` provides very lightweight structure and support useful for Express-based microservices. It is
not a framework and doesn't get in the way of Express, but it does offer a nice convention
for directory-based routing that you can use if you choose to.

This generator will scaffold an app that correctly handles signals for graceful server shutdown,
including inside of a Docker container. It provides a useful set of docker-compose files for
running containers for production and development (mounts the local `dist` directory during development).

It generates ES6 source files and provides npm run script support for `npm run babel`, `npm run watch`,
and `npm run nodemon`.

Features:

  * Docker support for production and development, including debugging support with [Node Inspector](https://github.com/node-inspector/node-inspector)
  * Signal handling for graceful server shutdown (including inside of Docker containers)
  * [Babel](https://babeljs.io) support
  * [ESLint](http://eslint.org/) / [esformatter](https://github.com/millermedeiros/esformatter) support


## Installation

First, install [Yeoman](http://yeoman.io) and generator-atomiq using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-atomiq
```

Then generate your new microservice project:

```bash
yo atomiq [name]
```

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

MIT © atomiq.io


[npm-image]: https://badge.fury.io/js/generator-atomiq.svg
[npm-url]: https://npmjs.org/package/generator-atomiq
[travis-image]: https://travis-ci.org/atomiqio/generator-atomiq.svg?branch=master
[travis-url]: https://travis-ci.org/atomiqio/generator-atomiq
[daviddm-image]: https://david-dm.org/atomiqio/generator-atomiq.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/atomiqio/generator-atomiq
