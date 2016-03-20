import { Route } from 'atomiq';

// /ping
export default class Ping extends Route {

  // GET /ping
  get(req, res) {
    res.json(req.app.get('service'));
  }

}
