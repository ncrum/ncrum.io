import { Schema, normalize, arrayOf } from 'normalizr'

export const BlogActionTypes = {
    BLOG_REQUEST : 'BLOG_REQUEST',
    BLOG_SUCCESS : 'BLOG_SUCCESS',
    BLOG_FAILURE   : 'BLOG_FAILURE',
}

const Blog = new Schema('blogs')

// TEMPORARY BLOG DATA
const blogResponse = {
    blogs : [
        {
            id : 1,
            title : 'Test',
            description : `This is a blog.`,
            body : `### Testing`,
        },
        {
            id : 2,
            title : 'Test2',
            description : `This is another blog.`,
            body : `### Testing Testing`,
        },
        {
            id : 3,
            title : 'Test3',
            description : `This is yet another blog.`,
            body : `### Testing Testing Testing`,
        }
    ]
}

export function fetchBlogs() {
    return (dispatch) => {
        dispatch({ type : BlogActionTypes.BLOG_REQUEST })
        return Promise.resolve(blogResponse)
        .then((response) => {
            dispatch({
                type : BlogActionTypes.BLOG_SUCCESS,
                response : normalize(response, {
                    blogs : arrayOf(Blog)
                })
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
