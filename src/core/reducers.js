import {
  REQUEST_POSTS, RECEIVE_POSTS,
  REQUEST_POST, RECEIVE_POST
} from './actions'

function posts(state = {
  isFetching: false,
  posts: []
}, action) {
  switch(action.type) {
  case REQUEST_POSTS:
    return Object.assign({}, state, {
      isFetching: true
    })
  case RECEIVE_POSTS:
    return Object.assign({}, state, {
      isFetching: false,
      posts: action.posts,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

function post(state = {
  isFetching: false,
  post: {}
}, action) {
  switch(action.type) {
  case REQUEST_POST:
    return Object.assign({}, state, {
      isFetching: true
    })
  case RECEIVE_POST:
    return Object.assign({}, state, {
      isFetching: false,
      post: action.post,
      lastUpdated: action.receivedAt
    })
  default:
    return state
  }
}

function blog(state = {}, action) {
  switch(action.type) {
  case RECEIVE_POSTS:
  case REQUEST_POSTS:
    return Object.assign({}, state, posts(state, action))
  case REQUEST_POST:
  case RECEIVE_POST:
    return Object.assign({}, state, {
      currentPost : action.title,
      [action.title] : post(state[action.title], action)
    })
  default:
    return state
  }
}

export default {
  blog
}
