import fs from 'fs';
import Router from 'koa-router';
import browserify from 'koa-browserify-middleware';

function renderFile(src) {
  return new Promise(function (resolve, reject) {
    fs.readFile(src, {'encoding': 'utf8'}, (err, data) => {
      if (err) return reject(err);
      resolve(data);
    });
  });
}

const config = {
  common: {
    bundle: 'common.js',
    packages: [
      'react',
      'react-router',
      'react-redux',
      'react-router-redux',
      'redux',
      'redux-thunk'
    ]
  }
}

export default function(app, indexPath) {
  const router = new Router();

  router.get('/dist/' + config.common.bundle, browserify(config.common.packages, {
    cache: true,
    precompile: true
  }))

  router.get('/dist/app.js', browserify('./client/app.js', {
    external : config.common.packages,
    transform : [["babelify", { "presets": ["es2015", "react", "stage-2"] }]]
  }))

  router.get('/*', function*(){
		this.body = yield renderFile(indexPath)
	})

  app.use(router.middleware());
}
