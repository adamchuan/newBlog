import React from 'react'
import ReactDOM from 'react-dom'
import {
    createStore
}
from 'redux'
import Home from './components/home.js'
import {
    markdown
}
from "markdown"

const store = createStore((article = [], action) => {
    switch (action.type) {
        case 'load':
            article = action.data
            return article
        default:
            return article
    }
})

const tagsStore = createStore((tags = [], action) => {
    switch (action.type) {
        case 'load':
            tags = action.data
            return tags
        default:
            return tags
    }
})

const rootEl = document.getElementById('root')

AV.initialize('gA9Y4wP6AqhAp6W1BIsgw1E9', 'YIc35k2VUfFYO9MNgGkqxQ7c');

function getAricleFromDb() {
    var query = new AV.Query('Article');
    query
        .select('title', 'summary', 'tags', 'date')
        .find()
        .then((data) => {
            // 成功获得实例

            let article = data.map((object) => {
                let date = new Date(object.createdAt)

                return {
                    'id': object.id,
                    'summary': markdown.toHTML(object.get('summary')),
                    'title': object.get('title'),
                    'tags': object.get('tags'),
                    'date': `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`,
                }
            })

            store.dispatch({
                type: 'load',
                data: article,
            })

        }, (error) => console.log(error))
}


function render() {
    ReactDOM.render(<Home article={store.getState()} />, rootEl);
}

render()
store.subscribe(render)

getAricleFromDb()