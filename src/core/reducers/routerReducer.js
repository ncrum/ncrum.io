import {combineReducers} from 'redux'
import {connect} from 'react-redux'
import {ROUTES_CHANGE, LOCATION_CHANGE} from 'core/actions/routerActions'

const initialState = {
  location: null,
};

function routingReducer(state = initialState, { type, payload } = {}) {
  if (type === LOCATION_CHANGE) {
    return { ...state, ...payload };
  }

  return state;
}

function schemaReducer(state = {}, action) {
    return action.type === ROUTES_CHANGE ?
        {routes : action.routes} : state
}

export default combineReducers({
    routing : routingReducer,
    schema : schemaReducer,
})

export function withLocation(component) {
    return connect(({router}) => router.routing)(component)
}

export function withRoutes(component) {
    return connect(({router}) => router.schema)(component)
}
