import React, { Component } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, hashHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { markdown } from 'markdown'
import store from './store/configureStore'
import Footer from './components/Footer'
import Header from './components/Header'
import Post from './components/Post'
import Posts from './components/Posts'
import Manage from './components/Manage'
import Login from './components/Login'
import Editor from './components/Editor'
import AV from 'avoscloud-sdk'

const history = syncHistoryWithStore(hashHistory, store)

class Nav extends Component {
  render () {
    return (
      <div className='root-inner'>
        <Header />
        <div className='main'>
          {this.props.children}
        </div>
        <Footer />
      </div>
    )
  }
}

function requireAuth (nextState, replace) {
  return true
  if (!store.getState().user.isLogin) {
    replace({
      pathname: '/login',
      state: { nextPathname: nextState.location.pathname }
    })
  }
}

document.addEventListener('DOMContentLoaded', () => {
  AV.initialize('gA9Y4wP6AqhAp6W1BIsgw1E9', 'YIc35k2VUfFYO9MNgGkqxQ7c')

  Promise.all([
    getTagsPromise(),
    getPostsPromise()
  ])
    .then(() => {
      render(
        <Provider store={store}>
          <Router history={history}>
            <Route path='/' component={Nav}>
              <IndexRoute component={Posts} />
              <Route path='/post/:postid' component={Post} />
              <Route path='/login' components={Login} />
              <Route path='/manage' component={Manage} onEnter={requireAuth} >
                <IndexRoute component={Editor} />
                <Route path='/editor/:postid' components={Editor} />
              </Route>
            </Route>
          </Router>
        </Provider>,
        document.getElementById('root')
      )
    })

  function getTagsPromise () {
    return new AV.Query('Tags')
      .addAscending('index')
      .find()
      .then((data) => {
        let tags = data.map((object, index) => {
          return {
            name: object.get('name'),
            index: object.get('index')
          }
        })

        store.dispatch({
          type: 'TAGS_INIT',
          data: tags
        })
      }, (err) => console.log(err))
      .catch((err) => console.log(err))
  }

  function getPostsPromise () {
    return new AV.Query('Article')
      .select('title', 'summary', 'tags', 'date')
      .find()
      .then((data) => {
        let posts = data.map((object) => {
          let date = new Date(object.createdAt)

          return {
            'id': object.id,
            'summary': markdown.toHTML(object.get('summary')),
            'title': object.get('title'),
            'tags': object.get('tags'),
            'date': `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDay()}`
          }
        })

        store.dispatch({
          type: 'INIT_POSTS',
          data: posts
        })
      }, (err) => console.log(err))
      .catch((err) => console.log(err))
  }
})
