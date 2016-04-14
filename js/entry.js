import React from 'react'

import {
    render
}
from 'react-dom'

import {
    createStore
}
from 'redux'

import {
    Provider
}
from 'react-redux'

import {
    Router, Route, IndexRoute, hashHistory
}
from 'react-router'

import {
    syncHistoryWithStore
}
from 'react-router-redux'

import {
    markdown
}
from 'markdown'

import configureStore from './store/configureStore'
import Footer from './components/footer'
import Header from './components/header'
import Post from './components/Post'
import Posts from './components/Posts'

const store = configureStore()
const history = syncHistoryWithStore( hashHistory, store )


class Nav extends React.Component {
    render() {
        return (
            <div>
                <Header />
                {this.props.children}
                <Footer />
            </div>
        )
    }
}

document.addEventListener( 'DOMContentLoaded', () => {

    AV.initialize( 'gA9Y4wP6AqhAp6W1BIsgw1E9', 'YIc35k2VUfFYO9MNgGkqxQ7c' );

    Promise.all( [
            getTagsPromise(),
            getPostsPromise()
        ] )
        .then( () => {
            render(
                <Provider store={store}>
                { /* Tell the Router to use our enhanced history */ }
                <Router history={hashHistory}>
                    <Route path="/" component={Nav}>
                        <IndexRoute component={Posts}/>
                        <Route path="/post/:postid" component={Post} />
                    </Route>
                </Router>
            </Provider>,
                document.getElementById( 'root' )
            )
        } )

    function getTagsPromise() {
        return new AV.Query( 'Tags' )
            .find()
            .then( ( data ) => {
                let tags = data.map( ( object, index ) => {
                    return {
                        name: object.get( 'name' ),
                        index,
                    }
                } )

                store.dispatch( {
                    type: 'TAGS_INIT',
                    data: tags
                } )
            }, err => console.log( err ) )
            .catch( err => console.log( err ) )

    }

    function getPostsPromise() {
        return new AV.Query( 'Article' )
            .select( 'title', 'summary', 'tags', 'date' )
            .find()
            .then( ( data ) => {

                let posts = data.map( ( object ) => {
                    let date = new Date( object.createdAt )

                    return {
                        'id': object.id,
                        'summary': markdown.toHTML( object.get( 'summary' ) ),
                        'title': object.get( 'title' ),
                        'tags': object.get( 'tags' ),
                        'date': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`,
                    }
                } )

                store.dispatch( {
                    type: 'INIT_POSTS',
                    data: posts,
                } )

            }, err => console.log( err ) )
            .catch( err => console.log( err ) )
    }

} );