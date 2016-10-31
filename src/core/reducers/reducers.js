import { combineReducers } from 'redux'
import routerReducer from 'core/reducers/routerReducer'

const rootReducer = combineReducers({
    router : routerReducer
})

export default rootReducer
