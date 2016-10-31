import React from 'react'
import ReactDOM from 'react-dom'
import ConnectedRouter from 'core/containers/ConnectedRouter'
import { Provider } from 'react-redux'
import { configureStore } from 'core/store/configureStore'
import App from 'core/containers/App'

const store = configureStore()

ReactDOM.render(
    <Provider store={store}>
        <ConnectedRouter store={store}>
            <App/>
        </ConnectedRouter>
    </Provider>,
    document.querySelector('#root')
)
