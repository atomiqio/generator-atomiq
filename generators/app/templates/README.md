# <%= name %>

This microservice has been generated with a few basic routes and a test.

## Features:

  * Docker support for production and development, including debugging support with [Node Inspector](https://github.com/node-inspector/node-inspector)
  * Signal handling for graceful server shutdown (including inside of Docker containers)
  * [Babel](https://babeljs.io) support
  * [ESLint](http://eslint.org/) / [esformatter](https://github.com/millermedeiros/esformatter) support


## make.js script

This project has a `make.js` script that supports building, running, and testing locally and in a Docker container.

 * `node make clean` - remove the `dist` directory
 * `node make babel` - transpile `src` to `dist` with sourcemaps (ES6 and async/await support)
 * `node make build` - transpile, then build a Docker image
 * `node make run` - start in container or start locally (--local)
 * `node make test` - run mocha tests in container or locally (--local)
 * `node make debug` - run with debugging support in container or locally (--local)
 * `node make watch` - when anything in src changes, re-transpile to dist
 * `node make monitor` - when anything in dist changes, restart server in container or locally (--local)
 * `node make host` - get Docker machine IP:PORT for the app running in a container

## Trying it out

terminal #1

    $ node make build
    $ node make monitor

terminal #2

    $ node make watch

terminal #3

    host=$(node make host)

    $ curl $host/item/ping

    $ curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' $host/item/1

    $ # easier POST with curl default (application/x-www-form-urlencoded):
    $ curl -X POST -d "param1=value1&param2=value2" $url/item/1

    $ # or post with data file
    $ curl -d "@data.json" -X POST $url/item/1
