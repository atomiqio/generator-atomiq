# generator-atomiq [![NPM version][npm-image]][npm-url]

> Generate a Node microservice with Docker, Express, Babel, Node
  Inspector support, and optional directory-based routing conventions.

This is a generator for [atomiq].

`atomiq` provides very lightweight structure and support useful for
Express-based microservices. It is not a framework and doesn't get in
the way of Express, but it does offer a nice convention for
directory-based routing that you can use if you choose to.

This generator will scaffold an app that correctly handles signals
for graceful server shutdown, including inside of a Docker container.
It provides a useful set of docker-compose files for running containers
for production and development (mounts the local `dist` directory
during development).

It generates a few sample routes using ES6 classes and provides a simple
Node.js make script that supports building, running, and testing
locally and in a Docker container.

 * `node make clean` - remove the `dist` directory
 * `node make babel` - transpile `src` to `dist` with sourcemaps (ES6 and async/await support)
 * `node make build` - transpile, then build a Docker image
 * `node make run` - start in container or start locally (--local)
 * `node make test` - run mocha tests in container or locally (--local)
 * `node make debug` - run with debugging support in container or locally (--local)
 * `node make watch` - when anything in src changes, re-transpile to dist
 * `node make monitor` - when anything in dist changes, restart server in container or locally (--local)
 * `node make host` - get Docker machine IP:PORT for the app running in a container

Features:

  * Docker support for production and development, including debugging support with [Node Inspector]
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

See new project `README.md` for further instructions.

## Yeoman

This generator was build with [Yeoman].

## License

MIT © atomiq.io

[atomiq]: https://github.com/atomiqio/atomiq
[Node Inspector]: https://github.com/node-inspector/node-inspector
[npm-image]: https://badge.fury.io/js/generator-atomiq.svg
[npm-url]: https://npmjs.org/package/generator-atomiq
[Yeoman]: http://yeoman.io
