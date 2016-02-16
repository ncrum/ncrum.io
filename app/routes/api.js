import restify from '../util/restify';
import Router from 'koa-router';
import Blog from '../schema/Blog';

export default function(app) {
  const router = new Router();

  restify(router, Blog, '/api');

  app.use(router.middleware());
}
