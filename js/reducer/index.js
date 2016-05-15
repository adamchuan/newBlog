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

function errorMessage (state = [], action) {
  let nextstate 
  switch (action.type) {
    case 'RESET_ERROR_MESSAGE':
      nextstate = null
      break
    default:
      if (action.error) {
        nextstate = action.error.toString()
      } else {
        nextstate = null
      }
  }

  return nextstate
}

function posts (state = {
  isFetching: false,
  posts: []
}, action) {
  switch (action.type) {
    case 'INIT_POSTS':
      state = Object.assign({}, state, {
        posts: action.posts,
        isFetching: false
      })
      break
    case 'ADD_POST':
      state.posts.push(action.post)
      break
    case 'REMOVE_POST':
      let index = state.posts.findIndex((item) => {
        return item.id === action.postid
      })
      if (index > -1) {
        state.posts.splice(index, 1)
      }
      break
    case 'UPDATE_POST':
      let post = state.posts.find((item) => {
        return item.id === action.postid
      })
      if (post) {
        Object.assign(post, action.data)
      }
      break
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
    case 'CREATE_POST':
      state = Object.assign({
        title: '',
        summary: '',
        content: '',
        id: '',
        tags: []
      }, action.post, {
        isFetching: true,
        isLoad: false
      })
      break
    case 'CREATE_POST_SUCCESS':
      state = Object.assign({}, state, {
        isFetching: false,
        isLoad: false
      })
      break
    case 'CREATE_POST_FAIL':
      state = Object.assign({}, state, {
        isFetching: false,
        isLoad: false,
        title: '',
        summary: '',
        content: '',
        tags: []
      })
      break
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
    case 'SAVE_POST':
      state = Object.assign({}, state, {
        isFetching: true
      })
      break
    case 'SAVE_POST_SUCCESS':
      state = Object.assign({}, state, {
        isFetching: false
      })
      break
    case 'SAVE_POST_FAIL':
      state = Object.assign({}, state, {
        isFetching: false
      })
      break
    case 'DELETE_POST':
      state = Object.assign({}, state, {
        isFetching: true,
        isLoad: false
      })
      break
    case 'DELETE_POST_SUCCESS':
      state = Object.assign({}, state, {
        isFetching: false,
        isLoad: false
      })
      break
    case 'DELETE_POST_FAIL':
      state = Object.assign({}, state, {
        isFetching: false
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
  errorMessage,
  routing: routerReducer
})

export default rootReducer
