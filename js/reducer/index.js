import {
    combineReducers
}
from 'redux'
import {
    routerReducer
}
from 'react-router-redux'

function tags( state = [], action ) {
    let nextstate
    switch ( action.type ) {
        case 'TAGS_INIT':
            nextstate = action.data
            break
        default:
            nextstate = state
    }
    return nextstate
}

function posts( state = {
    isFetching: false,
    selectPostId: null,
    posts: []
}, action ) {
    switch ( action.type ) {
        case 'INIT_POSTS':
            state.posts = action.data
            break
        case 'SELECT_POST':
            state.selectPostId = action.selectPostId

    }
    return state
}

function post( state = {
    isFetching: false,
    title: '',
    summary: '',
    content: '',
    tags: [],
}, action ) {
    switch ( action.type ) {
        case 'REQUEST_POST':
            state = Object.assign( {}, state, {
                isFetching: true,
            } )
        case 'INIT_POST':
            state = Object.assign( {}, action.data, {
                isFetching: false,
            } )
            break
        default:
            break
    }
    return state
}

const rootReducer = combineReducers( {
    posts,
    post,
    tags,
    routing: routerReducer,
} )

export default rootReducer