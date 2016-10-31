import { compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from 'core/reducers/reducers'

export function configureStore(initialState) {

    const store = createStore(
        rootReducer,
        initialState,
        compose(
            applyMiddleware(thunk, createLogger()),
            window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    )

    if (module.hot) {
        // Enable Webpack hot module replacement for reducers
        module.hot.accept('core/reducers/reducers', () => {
          const nextRootReducer = require('core/reducers/reducers').default
          store.replaceReducer(nextRootReducer)
        })
    }

    return store
}
