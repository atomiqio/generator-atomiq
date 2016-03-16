import 'babel-polyfill';
import 'source-map-support/register';

import GitHubUser from '../lib/GitHubUser';
import assert from 'assert';

// WARNING: don't use arrow functions with mocha describe(), it(),
// and all the other standard mocha functions that take callbacks
// if you want to be able to use `this.timeout()`. Because of the way
// arrow functions work, the `this` context will be the module, not
// the mocha context in the callback. Even if you don't anticipate
// needing access to the mocha `this` context in the callbacks, it's
// best to use full `function()` syntax for the mocha functions.

// async mocha helper inspired by Jason Jarrett:
// http://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/
let mocha = (asyncFunc, timeout = 2 * 1000) => {
  // Returns a function that takes a `done` parameter as mocha expects.
  // It doesn't use arrow syntax so the `this` context will be set correctly
  return async function(done) {
    this.timeout = timeout; // eslint-disable-line
    try {
      await asyncFunc();
      done();
    } catch (err) {
      done(err);
    }
  };
};

describe('tests', function() {

  // This is an auto-generated sample test to demo testing async functions
  it('should fetch GitHub user details for "subfuzion"', mocha(async () => {
    let login = 'subfuzion';
    let user = await GitHubUser.fetchDetails(login);
    assert(user);
    assert.equal(user.login, login);
    assert.equal(user.name, 'Tony Pujals');
    assert.equal(user.blog, 'https://twitter.com/subfuzion');
  }));

});
