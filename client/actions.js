import fetch from 'isomorphic-fetch';

function doFetch(url, options) {
  const finalUrl = (typeof process === 'object' && process + '' === '[object process]') ? 'http://127.0.0.1:' + (process.env.PORT || 8000) + url : url
  return fetch(finalUrl, options);
}

export const REQUEST_POSTS = 'REQUEST_POSTS';

export function requestPosts() {
  return {
    type: REQUEST_POSTS
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(json) {
  return {
    type: RECEIVE_POSTS,
    posts: json,
    receivedAt: Date.now()
  }
}

function fetchPosts() {
  return dispatch => {
    dispatch(requestPosts())
    return doFetch(`/api/blog?fl=title`)
      .then(response => response.json())
      .then(json => {
        dispatch(receivePosts(json))
      })
  }
}

function shouldFetchPosts(state) {
  if (!state.blog.posts) {
    return true
  } else if (state.blog.isFetching) {
    return false
  } else {
    return true;
  }
}

export function fetchPostsIfNeeded() {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPosts(getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPosts())
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}

export const REQUEST_POST = 'REQUEST_POST'

export function requestPost(title) {
  return {
    type: REQUEST_POST,
    title: title
  }
}

export const RECEIVE_POST = 'RECEIVE_POST'

export function receivePost(title, json) {
  return {
    type: RECEIVE_POST,
    title: title,
    post: json,
    receivedAt: Date.now()
  }
}

function fetchPost(title) {
  return dispatch => {
    dispatch(requestPost(title))
    return doFetch(`/api/blog?conditions={"title":"${title}"}`)
      .then(response => response.json())
      .then(json => {
        if (Array.isArray(json)) {
          json = json[0]
        }

        dispatch(receivePost(title, json))
      })
  }
}

function shouldFetchPost(title, state) {
  if (!state.blog[title]) {
    return true
  } else if (state.blog[title].isFetching) {
    return false
  } else {
    return true;
  }
}

export function fetchPostIfNeeded(title) {

  // Note that the function also receives getState()
  // which lets you choose what to dispatch next.

  // This is useful for avoiding a network request if
  // a cached value is already available.

  return (dispatch, getState) => {
    if (shouldFetchPost(title, getState())) {
      // Dispatch a thunk from thunk!
      return dispatch(fetchPost(title))
    } else {
      // Let the calling code know there's nothing to wait for.
      return Promise.resolve()
    }
  }
}
