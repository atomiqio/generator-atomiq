import { Route } from 'atomiq';

// /item/:id
export default class ItemByID extends Route {

  // GET /item/:id
  get(req, res) {
    res.json({ item: { id: req.params.id } });
  }

  // POST /item/:id
  post(req, res) {
    this.log(req.body);
    res.json({ status: 'success', received: req.body });
  }
}
