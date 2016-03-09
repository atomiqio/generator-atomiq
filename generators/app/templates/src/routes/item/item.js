import { Route } from 'atomiq';

// /item
export default class Item extends Route {

  // GET /item
  get(req, res) {
    res.json({ items: [] });
  }

}
