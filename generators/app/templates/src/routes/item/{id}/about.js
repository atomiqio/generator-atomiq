import { Route } from 'atomiq';

// /item/:id/about
export default class About extends Route {

  // GET /item/:id/about
  get(req, res) {
    res.json({
      id: req.params.id,
      about: 'whatevs'
    });
  }

}
