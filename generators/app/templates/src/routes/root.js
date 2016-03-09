import { Route } from 'atomiq';

// (root url) /
export default class Ping extends Route {

  // GET /
  get(req, res) {
    res.json({
      root: []
    });
  }

}
