import {
    combineReducers
}
from 'redux'


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

const rootReducer = combineReducers( {
    posts,
    tags
} )

export default rootReducer