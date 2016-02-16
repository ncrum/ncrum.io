require('./util/util');
import React from 'react';
import ReactDOM from 'react-dom';
import thunkMiddleWare from 'redux-thunk';
import { createStore, combineReducers, applyMiddleware, compose} from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer } from 'react-router-redux';
import reducers from './reducers';
import getRoutes from './root';
import {fetchPostsIfNeeded} from './actions';

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const history = browserHistory;
const reduxRouterMiddleware = syncHistory(history);
const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware, thunkMiddleWare),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('mount')
)
