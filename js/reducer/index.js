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

function posts( state = [], action ) {
    let nextstate
    switch ( action.type ) {
        case 'POSTS_INIT':
            nextstate = action.data
            break
        default:
            nextstate = state
    }
    return nextstate
}

function post( state = {
    id: '',
    title: '',
    summary: '',
    tags: [],
    content: '',
    postTime: ''
}, action ) {
    let nextstate
    switch ( action.type ) {
        case 'POST_INIT':
            nextstate = action.data
            break
        default:
            nextstate = state
    }
    return nextstate
}

const rootReducer = combineReducers( {
    posts,
    tags,
    post,
    routing: routerReducer,
} )

export default rootReducer