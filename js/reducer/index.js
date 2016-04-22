import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

function tags (state = [], action) {
  let nextstate
  switch (action.type) {
    case 'TAGS_INIT':
      nextstate = action.data
      break
    default:
      nextstate = state
  }
  return nextstate
}

function posts (state = {
  isFetching: false,
  selectPostId: null,
  posts: []
}, action) {
  switch (action.type) {
    case 'INIT_POSTS':
      state.posts = action.data
      break
    case 'SELECT_POST':
      state.selectPostId = action.selectPostId

  }
  return state
}

function post (state = {
  isFetching: false,
  isLoad: false,
  title: '',
  summary: '',
  content: '',
  id: '',
  tags: []
}, action) {
  switch (action.type) {
    case 'REQUEST_POST':
      state = Object.assign({}, state, {
        isFetching: true,
        isLoad: false,
        id: action.id
      })
      break
    case 'REQUEST_POST_SUCCESS':
      state = Object.assign({}, state, action.post, {
        isFetching: false,
        isLoad: true
      })
      break
    case 'REQUEST_POST_FAIL':
      state = Object.assign({}, state, {
        isFetching: false,
        isLoad: false,
        title: '',
        summary: '',
        content: '',
        tags: []
      })
      break
    case 'CHANGE_POST':
      state = Object.assign({}, state, action.data)
      break
    default:
      break
  }
  return state
}

function user (state = {
  isLogin: false,
  isFetching: false,
  username: '',
  password: '',
  role: 'guest'
}, action) {
  switch (action.type) {
    case 'LOGIN_VALIDATE':
      state = Object.assign({}, state, action.data, {
        isFetching: true
      })
      break
    case 'LOGIN_SUCCESS':
      state = Object.assign({}, state, action.data, {
        isFetching: false,
        isLogin: true
      })
      break
    case 'LOGIN_FAIL':
      state = Object.assign({}, {
        isLogin: false,
        isFetching: false
      })
      break
    default:
      break
  }
  return state
}

const rootReducer = combineReducers({
  posts,
  post,
  tags,
  user,
  routing: routerReducer
})

export default rootReducer
