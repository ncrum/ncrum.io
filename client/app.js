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

const reducer = combineReducers(Object.assign({}, reducers, {
  routing: routeReducer
}))

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = compose(
  applyMiddleware(reduxRouterMiddleware, thunkMiddleWare),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore);

const store = createStoreWithMiddleware(reducer, window.__INITIAL_STATE__);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      {getRoutes()}
    </Router>
  </Provider>,
  document.getElementById('mount')
)
