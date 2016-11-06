import About from 'core/containers/About'
import Blog from 'core/containers/Blog'
import Blogs from 'core/containers/Blogs'
export const ROUTES_CHANGE = '@@routing/ROUTES_CHANGE'
export const LOCATION_CHANGE = '@@routing/LOCATION_CHANGE';

export function fetchRoutes() {
    return (dispatch, getState) => {
        return getRoutes(getState())
        .then((routes) => dispatch({
            type : ROUTES_CHANGE,
            routes : routes
        }))
    }
}

function getRoutes(state) {
    return Promise.resolve([
        {
            pattern : '/',
            component : About,
            exactly : true,
        },
        {
            pattern : '/blogs',
            component : Blogs,
            exactly : true,
        },
        {
            pattern : '/blog/:title',
            component : Blog,
            exactly : true,
        },
    ])
}
