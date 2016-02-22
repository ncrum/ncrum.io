require('../../client/util/util');
import fs from 'fs'
import path from 'path'
import Router from 'koa-router'
import browserify from 'koa-browserify-middleware'
import serve from 'koa-static'
import React                     from 'react'
import { renderToString }        from 'react-dom/server'
import createMemoryHistory from 'history/lib/createMemoryHistory'
import createLocation from 'history/lib/createLocation'
import thunkMiddleWare from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux'
import { Provider } from 'react-redux'
import { RouterContext, match } from 'react-router'
import { syncHistory, routeReducer } from 'react-router-redux'
import getRoutes from '../../client/root'
import reducers from '../../client/reducers'
import {fetchPostsIfNeeded, fetchPostIfNeeded} from '../../client/actions';

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

function renderHtml(html, initialState) {
  return new Promise(function(resolve, reject) {
    resolve(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>ncrum.io</title>
          <link rel="stylesheet" type="text/css" href="/style.css">
        </head>
        <body>
          <div id="mount">${html}</div>
          <script>
            window.__INITIAL_STATE__ = ${JSON.stringify(initialState)}
          </script>
          <script src="/dist/common.js"></script>
          <script src="/dist/app.js"></script>
        </body>
      </html>
    `)
  })
}

export default function(app, indexPath) {
  const router = new Router();

  if (process.env.NODE_ENV !== 'production') {
    router.get('/dist/' + config.common.bundle, browserify(config.common.packages, {
      cache: true,
      precompile: true
    }))

    router.get('/dist/app.js', browserify('./client/app.js', {
      external : config.common.packages,
      transform : [["babelify", { "presets": ["es2015", "react", "stage-2"] }]]
    }))
  }

  router.get('/*', function*() {
    let props;
    let location = createLocation(this.url)

    let reducer = combineReducers(Object.assign({}, reducers, {
      routing: routeReducer
    }));

    // Sync dispatched route actions to the history
    let history = createMemoryHistory();
    let reduxRouterMiddleware = syncHistory(history);
    let createStoreWithMiddleware = compose(
      applyMiddleware(reduxRouterMiddleware, thunkMiddleWare)
    )(createStore);

    let store = createStoreWithMiddleware(reducer);

    match({ history, routes: getRoutes(), location }, (error, redirectLocation, renderProps) => {
      if (error) {
        this.throw(error.message, 500);
      } else if (redirectLocation) {
        this.redirect(redirectLocation.pathname + redirectLocation.search)
      } else if (renderProps) {
        props = renderProps;
      } else {
        this.throw("Not Found", 404);
      }
    })

    function fetchReduxStatePromise() {
      let { query, params } = props;
      let promises = [];

      let i = 0;
      for (; i < props.components.length; i++) {
        let comp = props.components[i].WrappedComponent;
        let promise = comp && comp.fetchData ?
          comp.fetchData({ query, params, store, history }) :
          Promise.resolve();

        promises.push(promise);
      }

      return Promise.all(promises);
    }


    if (props) {
      try {
          yield fetchReduxStatePromise();
      } catch (err) {
        this.throw(err, 500)
      }


      let html = renderToString(
        <Provider store={store}>
          <RouterContext {...props}/>
        </Provider>
      );

      this.body = yield renderHtml(html, store.getState())
    }
	})

  app.use(router.middleware());
}
