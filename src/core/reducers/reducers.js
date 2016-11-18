import { combineReducers } from 'redux'
import routerReducer from 'core/reducers/routerReducer'
import blogReducer from 'core/reducers/blogReducer'
import timerReducer from 'core/reducers/timerReducer'
import merge from 'lodash/merge'

const entities = (state = { blogs: {} }, action) => {
    if (action.response && action.response.entities) {
        return merge({}, state, action.response.entities)
    }

    return state
}

const rootReducer = combineReducers({
    router : routerReducer,
    blogs : blogReducer,
    timer : timerReducer,
    entities
})

export default rootReducer
