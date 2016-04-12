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
    markdown
}
from "markdown"
import Blog from './containers/Blog'
import configureStore from './store/configureStore'

const store = configureStore()

render(
    <Provider store={store}>
        <Blog />
    </Provider>,
    document.getElementById( 'root' )
)

document.addEventListener( 'DOMContentLoaded', () => {
    AV.initialize( 'gA9Y4wP6AqhAp6W1BIsgw1E9', 'YIc35k2VUfFYO9MNgGkqxQ7c' );

    let tags = new AV.Query( 'Tags' )
    tags.find()
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
        } )

    let query = new AV.Query( 'Article' )
    query
        .select( 'title', 'summary', 'tags', 'date' )
        .find()
        .then( ( data ) => {
            // 成功获得实例

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
                type: 'POSTS_INIT',
                data: posts,
            } )

        }, ( error ) => console.log( error ) )

} );