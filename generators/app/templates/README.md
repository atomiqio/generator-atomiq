atomiq-template
===============

This is the development version of the atomiq microservice template.

Development
-----------

`atomiq-template` has a dependency on `atomiqio/atomiq`. Obviously, if you want to make changes
to `atomiq`, you need to clone it also and do the whole `cd <path>/atomiq && npm ln && cd <path>/atomiq-template && npm ln atomiq` thing.

terminal #1

    $ git clone git git@github.com:atomiqio/atomiq-template.git
    $ cd atomiq-template
    $ npm run watch

terminal #2 (run on host)

    $ cd atomiq-template
    $ npm run nodemon

terminal #3 (run in container)

    $ cd atomiq-template
    $ npm run docker-build
    $ npm run docker-run-mounted-nodemon

terminal #4 (testing)

    # local test (examples)

    $ curl http://localhost:3000/item/1/about
    $ curl -X POST -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}' http://localhost:3000/item/1

    $ # easier POST with curl default (application/x-www-form-urlencoded):
    $ curl -X POST -d "param1=value1&param2=value2" http://localhost:3000/item/1

    $ # or post with data file
    $ curl -d "@data.json" -X POST http://localhost:3000/item/1


    # docker test

    $ HOST=$(docker-machine ip <name>)
    $ curl http://$HOST:3000/item/1/about

    # etc.
