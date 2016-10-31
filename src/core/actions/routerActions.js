import About from 'core/containers/About'
import Blog from 'core/containers/Blog'
export const ROUTES_CHANGE = '@@routing/ROUTES_CHANGE'
export const LOCATION_CHANGE = '@@routing/LOCATION_CHANGE';

export function getRoutes() {
    return {
        type : ROUTES_CHANGE,
        routes : [
            {
                pattern : '/',
                component : About,
                exactly : true,
            },
            {
                pattern : '/blog/:id',
                component : Blog,
                exactly : true,
            },
        ]
    }
}
