import { Schema, normalize, arrayOf } from 'normalizr'

export const BlogActionTypes = {
    BLOG_REQUEST : 'BLOG_REQUEST',
    BLOG_SUCCESS : 'BLOG_SUCCESS',
    BLOG_FAILURE   : 'BLOG_FAILURE',
}

const Blog = new Schema('blogs', {idAttribute : '_id'})

// TEMPORARY BLOG DATA
const blogResponse = {
    blogs : [
        {
            _id : 1,
            title : 'Test',
            description : `This is a blog.`,
            body : `### Testing`,
        },
        {
            _id : 2,
            title : 'Test2',
            description : `This is another blog.`,
            body : `### Testing Testing`,
        },
        {
            _id : 3,
            title : 'Test3',
            description : `This is yet another blog.`,
            body : `### Testing Testing Testing`,
        }
    ]
}

export function fetchBlogs() {
    return (dispatch, getState) => {
        const {lastUpdated} = getState().blogs

        if (Date.now() - lastUpdated < 1000 * 60) {
            return undefined
        }
        
        dispatch({ type : BlogActionTypes.BLOG_REQUEST })
        return fetch('http://api.ncrum.io/blog')
        .then((response) => response.json())
        .then((response) => {
            dispatch({
                type : BlogActionTypes.BLOG_SUCCESS,
                response : normalize(response, arrayOf(Blog)),
                receivedAt : Date.now(),
            })
        })
        .catch((error) => {
            dispatch({
                type : BlogActionTypes.BLOG_FAILURE,
                error : error
            })
        })
    }
}
