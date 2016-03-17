# <%= name %>

This microservice has been generated with a few basic routes and a test.

## Features:

  * Docker support for production and development, including debugging support with [Node Inspector](https://github.com/node-inspector/node-inspector)
  * Signal handling for graceful server shutdown (including inside of Docker containers)
  * [Babel](https://babeljs.io) support
  * [ESLint](http://eslint.org/) / [esformatter](https://github.com/millermedeiros/esformatter) support

  ## Details

  ### make.js script

  This project has a `make.js` script that supports building, running, and testing both locally
  and in a Docker container.

   * `node make clean` - remove the `dist` directory
   * `node make babel` - transpile `src` to `dist` with sourcemaps (ES6 and async/await support)
   * `node make build` - transpile, then build a Docker image
   * `node make run` - start in container or start locally (--local)
   * `node make test` - run mocha tests in container or locally (--local)
   * `node make debug` - run with debugging support in container or locally (--local)
   * `node make watch` - when anything in src changes, re-transpile to dist
   * `node make monitor` - when anything in dist changes, restart server in container or locally (--local)
   * `node make host` - get Docker machine IP:PORT for the app running in a container

  ### Developing

  terminal #1

      $ node make build

      # watch for changes in src and update dist
      $ node make watch

  terminal #2

      # watch for changes in dist and restart server
      $ node make monitor [--local]

  terminal #3

      host=$(node make host)

      $ curl $host/item/ping

      $ curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' $host/item/1

      $ # easier POST with curl default (application/x-www-form-urlencoded):
      $ curl -X POST -d "param1=value1&param2=value2" $url/item/1

      $ # or post with data file
      $ curl -d "@data.json" -X POST $url/item/1

  ### Testing

      $ node make test [--local]

  ### Debugging

      $ node make debug [--local]

  Open node inspector in browser

  local:

      $ open http://192.168.99.100:8080/?ws=192.168.99.100:8080&port=5858

  container:

     $ IP=$(docker-machine ip <machine>)
     $ open http://$IP:8080/?ws=$IP:8080&port=5858

  ### Routing

  Routes are ES6 modules that export a default class.

  If you decide to add a constructor to your class, make sure to call super(app):

      default export class MyRoute extends Route {
        constructor(app) {
          super(app);

          // you have access to the app and the express router for this route
          this.app ...
          this.router ...
        }
      }

  All [Express/HTTP methods](http://expressjs.com/en/4x/api.html#app.METHOD) are supported. Any method matching a verb name is automatically
  added to the router for `this` route. If you need to use an HTTP verb that is not a
  valid JavaScript name (there is only one: 'm-search'), you will need to attach it to `this.router` in the constructor:

      this.router['m-search'](req, res) {
        ...
      }
