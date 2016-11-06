import {connect} from 'react-redux'
import union from 'lodash/union'
import filter from 'lodash/filter'
import {BlogActionTypes, fetchBlogs} from 'core/actions/blogActions'

export default function blogReducer(state = {
    isFetching : false,
    ids : []
}, action) {
    switch(action.type) {
        case BlogActionTypes.BLOG_REQUEST:
        return {
            ...state,
            isFetching : true
        }
        case BlogActionTypes.BLOG_FAILURE:
        return {
            ...state,
            isFetching : false
        }
        case BlogActionTypes.BLOG_SUCCESS:
        return {
            ...state,
            isFetching : false,
            ids : union(state.ids, action.response.result),
            lastUpdated : action.receivedAt,
        }
        default :
        return state
    }
}

export function withBlogs(component) {
    return connect(
        ({blogs, entities}, {params}) => ({
            isFetching : blogs.isFetching,
            blogs : !blogs.isFetching
                && blogs.ids.map(id => entities.blogs[id]),
            currentBlog : !!params.title
                && filter(entities.blogs, blog => blog.title === params.title)[0],
        }), {fetchBlogs}
    )(component)
}
