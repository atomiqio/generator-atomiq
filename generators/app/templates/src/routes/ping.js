import { Route } from 'atomiq';

// /ping
export default class Root extends Route {

  // GET /ping
  get(req, res) {
    res.json(req.app.get('service'));
  }

}
