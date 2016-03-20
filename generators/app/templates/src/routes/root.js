import { Route } from 'atomiq';

// (root url) /
export default class Root extends Route {

  // GET /
  get(req, res) {
    res.json({ root: [] });
  }

}
