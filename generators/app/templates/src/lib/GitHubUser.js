// Auto-generated file for mocha test of static async method
// You can safely delete this and the corresponding test in src/test/test.js
import fetch from 'node-fetch';

export default class GitHubUser {

  static async fetchDetails(login) {
    let res = await fetch(`https://api.github.com/users/${login}`);
    return res.json();
  }

}
