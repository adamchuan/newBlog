import {
    combineReducers
}
from 'redux'
import {
    routerReducer
}
from 'react-router-redux'

function tags(state = [], action) {
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

function posts(state = {
    isFetching: false,
    selectPostId: null,
    posts: []
}, action) {
    switch (action.type) {
        case 'INIT_POSTS':
            state.posts = action.data
            break
        case 'SELECT_POST':
            state.selectPost = action.selectPostId
        case 'INIT_POST':
            let post = state.posts.find((post, i) => {
                return post.id === state.selectPostId
            })
            if (post) {
                post.content = action.content
            }
            break
        default:
            break
    }
    return state
}

const rootReducer = combineReducers({
    posts,
    tags,
    routing: routerReducer,
})

export default rootReducer